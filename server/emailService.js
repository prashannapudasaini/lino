import fs from 'fs';
import path from 'path';

// Optional nodemailer integration
let nodemailer = null;
try {
  const mod = await import('nodemailer');
  nodemailer = mod.default || mod;
} catch (e) {
  // If nodemailer isn't loaded, fallback logger will handle seamlessly
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const SENT_EMAILS_FILE = path.join(DATA_DIR, 'sent_emails.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(SENT_EMAILS_FILE)) {
    fs.writeFileSync(SENT_EMAILS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

function recordEmail(emailRecord) {
  try {
    ensureDataDir();
    const existing = JSON.parse(fs.readFileSync(SENT_EMAILS_FILE, 'utf-8') || '[]');
    existing.unshift(emailRecord);
    fs.writeFileSync(SENT_EMAILS_FILE, JSON.stringify(existing.slice(0, 100), null, 2), 'utf-8');
  } catch (err) {
    console.error('[EmailService] Failed to record email to disk:', err.message);
  }
}

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (nodemailer && host && user && pass) {
    return nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: { user, pass },
      tls: { rejectUnauthorized: false }
    });
  }
  return null;
}

/**
 * 1. Business Notification Email
 * Sent to Everest Executive Limo dispatch when a new booking enquiry arrives.
 */
export async function sendBusinessNotificationEmail(booking) {
  const businessEmail = process.env.BUSINESS_NOTIFICATION_EMAIL || 'booking@everestlimo.com';
  const fromEmail = process.env.SMTP_FROM || '"Everest Executive Limo Dispatch" <dispatch@everestlimo.com>';
  const subject = `[NEW REQUEST] ${booking.reference_code} — ${booking.full_name} (${booking.service_type})`;

  const flightDetails = booking.airport_code ? `
    <tr>
      <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; border-bottom: 1px solid #2A2A2E;">Airport & Flight:</td>
      <td style="padding: 8px 12px; color: #FFFFFF; font-size: 13px; font-weight: 600; border-bottom: 1px solid #2A2A2E;">
        ${booking.airport_code} ${booking.flight_type ? `(${booking.flight_type.toUpperCase()})` : ''} 
        ${booking.airline ? `• Airline: ${booking.airline}` : ''}
        ${booking.flight_number ? `• Flight #: ${booking.flight_number}` : ''}
      </td>
    </tr>
  ` : '';

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 24px; background-color: #0B0B0C; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F7F5F0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #151517; border: 1px solid #C5A46D; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        
        <!-- Header -->
        <div style="padding: 24px 32px; background: linear-gradient(180deg, #1D1D20 0%, #151517 100%); border-bottom: 1px solid rgba(197, 164, 109, 0.3);">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #C5A46D; font-weight: 700;">Everest Executive Limo LLC &bull; Dispatch Notice</span>
          <h1 style="margin: 8px 0 0 0; font-size: 22px; color: #FFFFFF; font-weight: 600;">New Ride & Quote Request</h1>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #A7A5A0;">A customer has submitted a new itinerary requiring a quotation.</p>
        </div>

        <!-- Reference Callout -->
        <div style="padding: 16px 32px; background-color: #1D1D20; border-bottom: 1px solid #2A2A2E; display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 12px; color: #A7A5A0; text-transform: uppercase; letter-spacing: 1px;">Request Reference:</span>
          <strong style="font-size: 16px; font-family: monospace; color: #C5A46D; letter-spacing: 1px;">${booking.reference_code}</strong>
        </div>

        <!-- Body Details -->
        <div style="padding: 24px 32px;">
          <table style="width: 100%; border-collapse: collapse; text-align: left;">
            <tr>
              <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; border-bottom: 1px solid #2A2A2E; width: 35%;">Client Name:</td>
              <td style="padding: 8px 12px; color: #FFFFFF; font-size: 14px; font-weight: bold; border-bottom: 1px solid #2A2A2E;">${booking.full_name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; border-bottom: 1px solid #2A2A2E;">Email:</td>
              <td style="padding: 8px 12px; color: #C5A46D; font-size: 13px; border-bottom: 1px solid #2A2A2E;"><a href="mailto:${booking.email}" style="color: #C5A46D; text-decoration: none;">${booking.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; border-bottom: 1px solid #2A2A2E;">Phone:</td>
              <td style="padding: 8px 12px; color: #FFFFFF; font-size: 13px; border-bottom: 1px solid #2A2A2E;"><a href="tel:${booking.phone}" style="color: #FFFFFF; text-decoration: none; font-weight: 600;">${booking.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; border-bottom: 1px solid #2A2A2E;">Service Type:</td>
              <td style="padding: 8px 12px; color: #FFFFFF; font-size: 13px; border-bottom: 1px solid #2A2A2E;">${booking.service_type}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; border-bottom: 1px solid #2A2A2E;">Pickup Address:</td>
              <td style="padding: 8px 12px; color: #FFFFFF; font-size: 13px; font-weight: 500; border-bottom: 1px solid #2A2A2E;">${booking.pickup_location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; border-bottom: 1px solid #2A2A2E;">Destination:</td>
              <td style="padding: 8px 12px; color: #FFFFFF; font-size: 13px; font-weight: 500; border-bottom: 1px solid #2A2A2E;">${booking.dropoff_location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; border-bottom: 1px solid #2A2A2E;">Pickup Schedule:</td>
              <td style="padding: 8px 12px; color: #C5A46D; font-size: 13px; font-weight: 600; border-bottom: 1px solid #2A2A2E;">${booking.pickup_date} at ${booking.pickup_time} (${booking.trip_type === 'round_trip' ? 'Round-Trip' : 'One-Way'})</td>
            </tr>
            ${flightDetails}
            <tr>
              <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; border-bottom: 1px solid #2A2A2E;">Vehicle Requested:</td>
              <td style="padding: 8px 12px; color: #FFFFFF; font-size: 13px; border-bottom: 1px solid #2A2A2E;">${booking.vehicle_preference}</td>
            </tr>
            <tr>
              <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; border-bottom: 1px solid #2A2A2E;">Passengers & Luggage:</td>
              <td style="padding: 8px 12px; color: #FFFFFF; font-size: 13px; border-bottom: 1px solid #2A2A2E;">${booking.passengers} Passengers &bull; ${booking.luggage} Bags</td>
            </tr>
            ${booking.special_requests ? `
            <tr>
              <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; border-bottom: 1px solid #2A2A2E; vertical-align: top;">Special Requests:</td>
              <td style="padding: 8px 12px; color: #F7F5F0; font-size: 13px; border-bottom: 1px solid #2A2A2E; background-color: rgba(255,255,255,0.02);">${booking.special_requests}</td>
            </tr>
            ` : ''}
            ${booking.customer_notes ? `
            <tr>
              <td style="padding: 8px 12px; color: #A7A5A0; font-size: 13px; vertical-align: top;">Customer Notes:</td>
              <td style="padding: 8px 12px; color: #F7F5F0; font-size: 13px; background-color: rgba(255,255,255,0.02);">${booking.customer_notes}</td>
            </tr>
            ` : ''}
          </table>

          <div style="margin-top: 24px; padding: 14px; background-color: #1D1D20; border-radius: 8px; border-left: 3px solid #C5A46D;">
            <p style="margin: 0; font-size: 12px; color: #A7A5A0;">
              <strong>Action Required:</strong> Log in to the <a href="/admin/bookings" style="color: #C5A46D; font-weight: bold;">Everest Dispatch Dashboard</a> to review the route, calculate distance, and deliver the customized quote to the client.
            </p>
          </div>
        </div>

        <!-- Footer -->
        <div style="padding: 16px 32px; background-color: #0E0E10; border-top: 1px solid #2A2A2E; text-align: center;">
          <p style="margin: 0; font-size: 11px; color: #666666;">
            &copy; ${new Date().getFullYear()} Everest Executive Limo LLC. All rights reserved. Confidential Dispatch Transmission.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const record = {
    id: `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'business_notification',
    to: businessEmail,
    from: fromEmail,
    subject,
    reference_code: booking.reference_code,
    timestamp: new Date().toISOString(),
    status: 'sent'
  };

  try {
    const transporter = getTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: fromEmail,
        to: businessEmail,
        subject,
        html
      });
      console.log(`[EmailService] ✓ Business notification SMTP sent to ${businessEmail}`);
    } else {
      console.log(`[EmailService] [Dev Mode] Business notification queued for ${businessEmail} (${booking.reference_code})`);
    }
  } catch (err) {
    console.error('[EmailService] SMTP error sending business notification:', err.message);
    record.status = 'error';
    record.error = err.message;
  }

  recordEmail(record);
  return record;
}

/**
 * 2. Customer Confirmation Email
 * Automatic acknowledgement sent to the customer upon request submission.
 */
export async function sendCustomerConfirmationEmail(booking) {
  const fromEmail = process.env.SMTP_FROM || '"Everest Executive Limo" <concierge@everestlimo.com>';
  const subject = `Your Quote Request [${booking.reference_code}] — Everest Executive Limo`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin: 0; padding: 24px; background-color: #0B0B0C; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F7F5F0;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #151517; border: 1px solid #C5A46D; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
        
        <!-- Header & Logo -->
        <div style="padding: 32px 32px 24px 32px; background: linear-gradient(180deg, #1D1D20 0%, #151517 100%); text-align: center; border-bottom: 1px solid rgba(197, 164, 109, 0.3);">
          <div style="font-size: 20px; font-weight: 700; letter-spacing: 4px; color: #C5A46D; text-transform: uppercase;">EVEREST</div>
          <div style="font-size: 10px; letter-spacing: 3px; color: #A7A5A0; text-transform: uppercase; margin-top: 2px;">EXECUTIVE LIMO LLC</div>
          <div style="width: 40px; height: 1px; background-color: #C5A46D; margin: 16px auto;"></div>
          <h1 style="margin: 0; font-size: 24px; color: #FFFFFF; font-weight: normal; font-family: Georgia, serif;">
            Your Ride Request Has Been Received
          </h1>
        </div>

        <!-- Greeting & Exact Required Message -->
        <div style="padding: 24px 32px 16px 32px;">
          <p style="font-size: 15px; color: #FFFFFF; line-height: 1.6; margin: 0 0 16px 0;">
            Dear <strong>${booking.full_name}</strong>,
          </p>
          <p style="font-size: 14px; color: #E0DDD5; line-height: 1.7; margin: 0 0 16px 0;">
            Your ride request has been successfully submitted!
          </p>
          <p style="font-size: 14px; color: #A7A5A0; line-height: 1.7; margin: 0 0 20px 0;">
            Thank you for choosing Everest Executive Limo. Our team has received your request and will contact you shortly with your personalized quotation.
          </p>

          <!-- Non-Binding Notice Banner -->
          <div style="padding: 12px 16px; background-color: rgba(197, 164, 109, 0.08); border: 1px solid rgba(197, 164, 109, 0.3); border-radius: 8px; margin-bottom: 24px;">
            <p style="margin: 0; font-size: 12px; color: #C5A46D; line-height: 1.5;">
              <strong>Please Note:</strong> This transmission confirms receipt of your itinerary details. This is an enquiry request and not a final confirmed reservation. No charges have been made.
            </p>
          </div>
        </div>

        <!-- Reference Box -->
        <div style="margin: 0 32px 24px 32px; padding: 16px 20px; background-color: #1D1D20; border-radius: 8px; border: 1px solid #2A2A2E; text-align: center;">
          <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #A7A5A0; margin-bottom: 4px;">Quote Reference Number</div>
          <div style="font-size: 20px; font-family: monospace; font-weight: bold; color: #C5A46D; letter-spacing: 2px;">${booking.reference_code}</div>
        </div>

        <!-- Journey Summary -->
        <div style="padding: 0 32px 24px 32px;">
          <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 1.5px; color: #C5A46D; margin: 0 0 12px 0; font-weight: 700;">Submitted Journey Details</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
            <tr>
              <td style="padding: 8px 0; color: #A7A5A0; width: 35%; border-bottom: 1px solid #222226;">Service:</td>
              <td style="padding: 8px 0; color: #FFFFFF; font-weight: 600; border-bottom: 1px solid #222226;">${booking.service_type}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #A7A5A0; border-bottom: 1px solid #222226;">Pickup Address:</td>
              <td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #222226;">${booking.pickup_location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #A7A5A0; border-bottom: 1px solid #222226;">Destination:</td>
              <td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #222226;">${booking.dropoff_location}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #A7A5A0; border-bottom: 1px solid #222226;">Requested Time:</td>
              <td style="padding: 8px 0; color: #C5A46D; font-weight: 600; border-bottom: 1px solid #222226;">${booking.pickup_date} at ${booking.pickup_time}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #A7A5A0; border-bottom: 1px solid #222226;">Vehicle Class:</td>
              <td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #222226;">${booking.vehicle_preference}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #A7A5A0; border-bottom: 1px solid #222226;">Group:</td>
              <td style="padding: 8px 0; color: #FFFFFF; border-bottom: 1px solid #222226;">${booking.passengers} Passengers &bull; ${booking.luggage} Luggage Bags</td>
            </tr>
          </table>
        </div>

        <!-- Next Steps -->
        <div style="padding: 20px 32px; background-color: #121214; border-top: 1px solid #2A2A2E;">
          <h4 style="font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #C5A46D; margin: 0 0 10px 0;">What Happens Next</h4>
          <ol style="margin: 0; padding-left: 18px; font-size: 12px; color: #A7A5A0; line-height: 1.8;">
            <li>Our dispatch team reviews vehicle positioning, tolls, and travel time.</li>
            <li>You will receive an official quotation via email or telephone with transparent, all-inclusive pricing.</li>
            <li>Upon your approval, your chauffeur and vehicle are formally scheduled.</li>
          </ol>
        </div>

        <!-- Need immediate assistance -->
        <div style="padding: 20px 32px; text-align: center; border-top: 1px solid #2A2A2E;">
          <p style="margin: 0; font-size: 12px; color: #A7A5A0;">
            Need immediate assistance or last-minute arrangements? Call our 24/7 dispatch desk:
          </p>
          <a href="tel:+17175550199" style="display: inline-block; margin-top: 8px; font-size: 15px; font-weight: bold; color: #C5A46D; text-decoration: none;">
            +1 (717) 555-0199
          </a>
        </div>

        <!-- Footer -->
        <div style="padding: 16px 32px; background-color: #0E0E10; text-align: center; border-top: 1px solid #222226;">
          <p style="margin: 0; font-size: 11px; color: #666666;">
            Everest Executive Limo LLC &bull; Harrisburg, PA &bull; Premium Mid-Atlantic Chauffeur Service
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const record = {
    id: `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type: 'customer_confirmation',
    to: booking.email,
    from: fromEmail,
    subject,
    reference_code: booking.reference_code,
    timestamp: new Date().toISOString(),
    status: 'sent'
  };

  try {
    const transporter = getTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: fromEmail,
        to: booking.email,
        subject,
        html
      });
      console.log(`[EmailService] ✓ Customer confirmation SMTP sent to ${booking.email}`);
    } else {
      console.log(`[EmailService] [Dev Mode] Customer confirmation queued for ${booking.email} (${booking.reference_code})`);
    }
  } catch (err) {
    console.error('[EmailService] SMTP error sending customer confirmation:', err.message);
    record.status = 'error';
    record.error = err.message;
  }

  recordEmail(record);
  return record;
}

