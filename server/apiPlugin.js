import fs from 'fs';
import path from 'path';
import url from 'url';
import { sendBusinessNotificationEmail, sendCustomerConfirmationEmail } from './emailService.js';

const DATA_DIR = path.resolve(process.cwd(), 'data');
const BOOKINGS_FILE = path.join(DATA_DIR, 'bookings.json');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

const INITIAL_BOOKINGS = [
  {
    id: 1,
    reference_code: 'EEL-2026-8812',
    full_name: 'Jonathan Vance',
    email: 'j.vance@executivecapital.com',
    phone: '+1 (717) 555-8910',
    service_type: 'Airport Transportation',
    vehicle_preference: 'Executive Luxury Sedan (Up to 3 Passengers)',
    pickup_location: '100 Senate Ave, Camp Hill, PA',
    dropoff_location: 'Philadelphia International Airport (PHL) Terminal A',
    pickup_date: '2026-11-12',
    pickup_time: '06:30',
    trip_type: 'one_way',
    passengers: 2,
    luggage: 3,
    airport_code: 'PHL',
    flight_type: 'departure',
    airline: 'American Airlines',
    flight_number: 'AA 2108',
    status: 'Confirmed',
    internal_notes: 'VIP client, flight departing 09:15 AM from PHL Terminal A. Chauffeur: Michael T.',
    estimated_quote: 295.0,
    created_at: new Date(Date.now() - 3600000 * 24).toISOString()
  },
  {
    id: 2,
    reference_code: 'EEL-2026-9240',
    full_name: 'Victoria Sterling',
    email: 'v.sterling@apexventures.org',
    phone: '+1 (212) 555-0144',
    service_type: 'Corporate & Executive Travel',
    vehicle_preference: 'Executive Luxury SUV (Up to 6 Passengers)',
    pickup_location: 'Penn State Health Medical Center, Hershey, PA',
    dropoff_location: 'Manhattan Midtown Financial District, New York, NY',
    pickup_date: '2026-11-15',
    pickup_time: '08:00',
    trip_type: 'round_trip',
    return_date: '2026-11-16',
    return_time: '17:00',
    passengers: 4,
    luggage: 4,
    airport_code: '',
    flight_type: '',
    airline: '',
    flight_number: '',
    status: 'Under Review',
    internal_notes: 'Board meeting roadshow with 4 executive directors. Multi-stop itinerary.',
    estimated_quote: 850.0,
    created_at: new Date(Date.now() - 3600000 * 6).toISOString()
  },
  {
    id: 3,
    reference_code: 'EEL-2026-3195',
    full_name: 'Dr. Robert Hawthorne',
    email: 'r.hawthorne@johnshopkins.edu',
    phone: '+1 (410) 555-4421',
    service_type: 'Airport Transportation',
    vehicle_preference: 'Executive Luxury Sedan (Up to 3 Passengers)',
    pickup_location: 'Harrisburg International Airport (MDT)',
    dropoff_location: 'The Hotel Hershey, 100 Hotel Rd, Hershey, PA',
    pickup_date: '2026-11-20',
    pickup_time: '14:15',
    trip_type: 'one_way',
    passengers: 1,
    luggage: 2,
    airport_code: 'MDT',
    flight_type: 'arrival',
    airline: 'United Express',
    flight_number: 'UA 4492',
    status: 'New Request',
    internal_notes: 'Flight arriving MDT at 14:05. Meet and greet with name placard inside baggage claim.',
    estimated_quote: null,
    created_at: new Date(Date.now() - 3600000 * 1).toISOString()
  }
];

function ensureStorage() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(BOOKINGS_FILE)) {
    fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(INITIAL_BOOKINGS, null, 2), 'utf-8');
  }
  if (!fs.existsSync(CONTACTS_FILE)) {
    fs.writeFileSync(CONTACTS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readBookings() {
  ensureStorage();
  try {
    const raw = fs.readFileSync(BOOKINGS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read bookings:', err);
    return [];
  }
}

function writeBookings(bookings) {
  ensureStorage();
  fs.writeFileSync(BOOKINGS_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1e6) { // 1MB limit for security
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(data));
}

// Simple in-memory rate limiting / spam protection
const rateLimitMap = new Map();
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 15; // Max 15 submissions per minute per IP

  const record = rateLimitMap.get(ip) || { count: 0, firstTime: now };
  if (now - record.firstTime > windowMs) {
    rateLimitMap.set(ip, { count: 1, firstTime: now });
    return false;
  }
  record.count += 1;
  rateLimitMap.set(ip, record);
  return record.count > maxRequests;
}

export function apiPlugin() {
  return {
    name: 'vite-api-server-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        // Only handle /api paths
        if (!pathname.startsWith('/api')) {
          return next();
        }

        // Handle CORS preflight
        if (req.method === 'OPTIONS') {
          res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          });
          return res.end();
        }

        const clientIp = req.socket.remoteAddress || '127.0.0.1';

        try {
          // ================= AUTH =================
          if (pathname === '/api/auth/login' && req.method === 'POST') {
            const body = await readBody(req);
            const { email, password } = body;
            if (
              (email === 'admin@everestlimo.com' && (password === 'EverestAdmin2026!' || password === 'EverestLimo2026!')) ||
              (email === 'dispatch@everestlimo.com' && password === 'EverestAdmin2026!')
            ) {
              return sendJson(res, 200, {
                access_token: 'eel-secure-admin-jwt-token-2026',
                token_type: 'bearer',
                user: {
                  id: 1,
                  email,
                  full_name: 'Executive Dispatch Administrator',
                  role: 'superadmin'
                }
              });
            }
            return sendJson(res, 401, { detail: 'Invalid credentials. Please verify your email and password.' });
          }

          if (pathname === '/api/auth/me' && req.method === 'GET') {
            return sendJson(res, 200, {
              id: 1,
              email: 'admin@everestlimo.com',
              full_name: 'Executive Dispatch Administrator',
              role: 'superadmin'
            });
          }

          // ================= BOOKINGS =================
          if (pathname === '/api/bookings' && req.method === 'GET') {
            let bookings = readBookings();
            const { status, date, search } = parsedUrl.query;

            if (status && status !== 'All') {
              bookings = bookings.filter(b => (b.status || '').toLowerCase() === status.toLowerCase());
            }

            if (date) {
              bookings = bookings.filter(b => b.pickup_date === date);
            }

            if (search) {
              const q = search.toLowerCase();
              bookings = bookings.filter(b =>
                (b.reference_code && b.reference_code.toLowerCase().includes(q)) ||
                (b.full_name && b.full_name.toLowerCase().includes(q)) ||
                (b.email && b.email.toLowerCase().includes(q)) ||
                (b.phone && b.phone.toLowerCase().includes(q)) ||
                (b.pickup_location && b.pickup_location.toLowerCase().includes(q)) ||
                (b.dropoff_location && b.dropoff_location.toLowerCase().includes(q))
              );
            }

            // Sort newest first
            bookings.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            return sendJson(res, 200, bookings);
          }

          if (pathname === '/api/bookings' && req.method === 'POST') {
            if (isRateLimited(clientIp)) {
              return sendJson(res, 429, { detail: 'Too many requests. Please wait a minute before submitting again.' });
            }

            const body = await readBody(req);

            // Spam honeypot check (hidden field that only bots fill)
            if (body.company_website_url || body._gotcha) {
              return sendJson(res, 200, { success: true, message: 'Request received' });
            }

            // Backend Validation
            if (!body.pickup_location || !body.pickup_location.trim()) {
              return sendJson(res, 400, { detail: 'Pickup address is required.' });
            }
            if (!body.dropoff_location || !body.dropoff_location.trim()) {
              return sendJson(res, 400, { detail: 'Destination address is required.' });
            }
            if (!body.pickup_date) {
              return sendJson(res, 400, { detail: 'Pickup date is required.' });
            }
            if (!body.pickup_time) {
              return sendJson(res, 400, { detail: 'Pickup time is required.' });
            }
            if (!body.full_name || !body.full_name.trim()) {
              return sendJson(res, 400, { detail: 'Full customer name is required.' });
            }
            if (!body.email || !body.email.includes('@')) {
              return sendJson(res, 400, { detail: 'A valid email address is required.' });
            }
            if (!body.phone || body.phone.trim().length < 7) {
              return sendJson(res, 400, { detail: 'A valid telephone number is required.' });
            }

            const bookings = readBookings();

            // Duplicate submission protection (within 30 seconds for same email and pickup)
            const thirtySecsAgo = Date.now() - 30 * 1000;
            const duplicate = bookings.find(b => 
              b.email?.toLowerCase() === body.email.toLowerCase() &&
              b.pickup_location?.toLowerCase() === body.pickup_location.toLowerCase() &&
              new Date(b.created_at).getTime() > thirtySecsAgo
            );

            if (duplicate) {
              return sendJson(res, 200, duplicate);
            }

            // Generate unique request reference code: EEL-2026-XXXXX
            const randomCode = Math.floor(10000 + Math.random() * 90000);
            const refCode = `EEL-2026-${randomCode}`;

            const newBooking = {
              id: Date.now(),
              reference_code: refCode,
              status: 'New Request',
              service_type: body.service_type || 'Airport Transportation',
              trip_type: body.trip_type || 'one_way',
              pickup_location: body.pickup_location.trim(),
              dropoff_location: body.dropoff_location.trim(),
              pickup_date: body.pickup_date,
              pickup_time: body.pickup_time,
              return_date: body.return_date || null,
              return_time: body.return_time || null,
              passengers: Number(body.passengers) || 1,
              luggage: Number(body.luggage) || 0,
              vehicle_preference: body.vehicle_preference || 'Executive Luxury Sedan',
              airport_code: body.airport_code || null,
              flight_type: body.flight_type || null,
              airline: body.airline || null,
              flight_number: body.flight_number || null,
              flight_date: body.flight_date || null,
              flight_time: body.flight_time || null,
              full_name: body.full_name.trim(),
              email: body.email.trim().toLowerCase(),
              phone: body.phone.trim(),
              special_requests: body.special_requests || '',
              customer_notes: body.customer_notes || '',
              internal_notes: '',
              estimated_quote: null,
              created_at: new Date().toISOString()
            };

            bookings.unshift(newBooking);
            writeBookings(bookings);

            // Asynchronously dispatch both email notifications (non-blocking)
            Promise.all([
              sendBusinessNotificationEmail(newBooking),
              sendCustomerConfirmationEmail(newBooking)
            ]).catch(err => console.error('[API] Error in email dispatch:', err));

            return sendJson(res, 201, newBooking);
          }

          // Single booking route /api/bookings/:id
          const bookingMatch = pathname.match(/^\/api\/bookings\/([^/]+)$/);
          if (bookingMatch) {
            const id = bookingMatch[1];
            const bookings = readBookings();
            const index = bookings.findIndex(b => String(b.id) === String(id) || b.reference_code === id);

            if (req.method === 'GET') {
              if (index === -1) return sendJson(res, 404, { detail: 'Booking request not found' });
              return sendJson(res, 200, bookings[index]);
            }

            if (req.method === 'PATCH' || req.method === 'PUT') {
              if (index === -1) return sendJson(res, 404, { detail: 'Booking request not found' });
              const body = await readBody(req);
              bookings[index] = {
                ...bookings[index],
                ...body,
                updated_at: new Date().toISOString()
              };
              writeBookings(bookings);
              return sendJson(res, 200, bookings[index]);
            }

            if (req.method === 'DELETE') {
              if (index === -1) return sendJson(res, 404, { detail: 'Booking request not found' });
              const removed = bookings.splice(index, 1);
              writeBookings(bookings);
              return sendJson(res, 200, { success: true, id, removed: removed[0] });
            }
          }

          // ================= STATS =================
          if (pathname === '/api/stats' && req.method === 'GET') {
            const bookings = readBookings();
            const total = bookings.length;
            const newRequests = bookings.filter(b => b.status === 'New Request').length;
            const confirmed = bookings.filter(b => b.status === 'Confirmed').length;
            const underReview = bookings.filter(b => b.status === 'Under Review').length;

            return sendJson(res, 200, {
              total_bookings: total,
              new_requests: newRequests,
              confirmed_bookings: confirmed,
              under_review: underReview,
              active_fleet: 6,
              on_time_rate: "99.9%"
            });
          }

          // ================= CONTACT =================
          if (pathname === '/api/contact' && req.method === 'POST') {
            const body = await readBody(req);
            ensureStorage();
            const contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE, 'utf-8') || '[]');
            const newContact = {
              id: Date.now(),
              ...body,
              created_at: new Date().toISOString()
            };
            contacts.unshift(newContact);
            fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf-8');
            return sendJson(res, 201, { success: true, message: 'Message received. We will respond promptly.' });
          }

          // ================= FLEET =================
          if (pathname === '/api/fleet' && req.method === 'GET') {
            return sendJson(res, 200, [
              {
                id: 1,
                name: 'Executive Luxury Sedan',
                category: 'Sedan',
                make_model: 'Mercedes-Benz S-Class / Cadillac CT6',
                passengers: 3,
                luggage: 3,
                hourly_rate: 115.0,
                base_rate: 195.0,
                image_url: '/images/custom/fleet-sedan.jpg',
                features: ['Acoustic Double-Glazing', 'Nappa Leather Recliners', 'Wi-Fi & Fast Charging'],
                is_active: true
              },
              {
                id: 2,
                name: 'Executive Luxury SUV',
                category: 'SUV',
                make_model: 'Cadillac Escalade ESV / Lincoln Navigator L',
                passengers: 6,
                luggage: 6,
                hourly_rate: 145.0,
                base_rate: 265.0,
                image_url: '/images/custom/fleet-suv.jpg',
                features: ['Extended Wheelbase Luggage', 'Second-Row Captain Chairs', 'All-Wheel Drive Traction'],
                is_active: true
              },
              {
                id: 3,
                name: 'Mercedes Executive Sprinter',
                category: 'Executive Van',
                make_model: 'Custom Jet-Class Cabin',
                passengers: 14,
                luggage: 12,
                hourly_rate: 195.0,
                base_rate: 450.0,
                image_url: '/images/custom/service-chauffeur.jpg',
                features: ['Full 6\'4" Standing Cabin', 'Executive Worktables', '4K Media & HDMI Presentation'],
                is_active: true
              }
            ]);
          }

          return sendJson(res, 404, { detail: `Endpoint not found: ${pathname}` });
        } catch (err) {
          console.error('[API Server Error]', err);
          return sendJson(res, 500, { detail: 'Internal server error', error: err.message });
        }
      });
    }
  };
}

