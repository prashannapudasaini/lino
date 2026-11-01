# Everest Executive Limo LLC
## Premium Luxury Chauffeur Website & Booking Management System

A production-quality digital platform and booking enquiry management system engineered for **Everest Executive Limo LLC**, a premier executive transportation and private chauffeur company based in Pennsylvania, serving Pennsylvania, New York, New Jersey, and Washington D.C.

Designed with an editorial luxury aesthetic inspired by premium private aviation, luxury automotive, and bespoke concierge services.

---

## 🌟 Key Architecture & Highlights

### 1. Frontend Experience (React + JSX + Tailwind CSS + GSAP + Vite)
- **Luxury Visual Identity**: Deep obsidian background (`#0B0B0C`), graphite surfaces (`#151517`), warm champagne gold accents (`#C5A46D`), and high-readability typography (`Cormorant Garamond` serif headings + `Plus Jakarta Sans` body/UI).
- **Mobile-First Luxury UX**: Engineered and tested across mobile viewports (320px–430px), tablets, and desktops. Zero horizontal overflow, comfortable thumb-zone touch targets (min 44×44px), sticky glass header on scroll, and accessible full-screen mobile drawer.
- **Apple-Inspired Section Variations**: Cinematic vehicle hero compositions, asymmetrical service cards, interactive airport hubs, and restrained verified trust indicators.
- **Refined GSAP Animations**: Silk-smooth hero entrance reveals, scroll transitions, and subtle hover lifts without performance bottlenecks.
- **Multi-Step Booking Enquiry System**: 5-step intuitive flow with journey details, vehicle preference, conditional airport flight details (MDT, PHL, EWR, JFK, LGA), client contact info, and clear consent/reassurance notices. Generates unique reference codes (`EEL-2026-XXXXX`).
- **Luxury AI Concierge Chatbot**: Floating desktop/mobile launcher connected to an executive AI concierge, answering questions about fleet, airports, and quotation procedures with approved business knowledge.
- **Optimized Bundle Performance**: Route-level code splitting, manual chunk separation (`vendor-react`, `vendor-icons`, `vendor-gsap`), gzipped assets under 65 kB, and lazy loading.

### 2. Backend Architecture (Python FastAPI + SQLAlchemy + SQLite/PostgreSQL)
- **Modular Architecture**: Layered design (`core`, `models`, `schemas`, `api`, `services`).
- **RESTful Endpoints**:
  - `POST /api/bookings`: Public quote request submission, validation, reference code generation, and automated transactional email dispatch.
  - `GET /api/bookings`: Protected admin enquiries query with search, date sorting, and status filtering.
  - `PATCH /api/bookings/{id}`: Admin status updates (`New`, `Reviewing`, `Quote Sent`, `Awaiting Response`, `Confirmed`, `Completed`, `Cancelled`, `Rejected`), quote pricing, and internal dispatch notes.
  - `GET /api/fleet`, `PUT /api/fleet/{id}`: Fleet inventory management and visibility toggling.
  - `GET /api/services`: Core executive services catalog.
  - `GET /api/airports`: Verified airport hubs (MDT, PHL, EWR, JFK, LGA).
  - `GET /api/service-areas`: Confirmed regional coverage (PA, NY, NJ, DC).
  - `POST /api/contact`, `GET /api/contact`: Client contact message inbox.
  - `POST /api/chat`: AI Concierge endpoint with Gemini model integration and rule-based fallback.
  - `GET /api/stats`: Real operational statistics calculated strictly from database records.
- **Security**: JWT token-based authentication (HS256), bcrypt password hashing, input validation via Pydantic v2, CORS protection.
- **Reliable Email Dispatch**: Beautiful, responsive transactional HTML emails for customer quotation acknowledgment and dispatch notifications.

---

## 📂 Project Structure

```
LIMO/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth.py         # Admin authentication (JWT)
│   │   │   ├── bookings.py     # Enquiry submissions & admin management
│   │   │   ├── fleet.py        # Vehicle catalog & admin CRUD
│   │   │   ├── services.py     # Service catalog & admin updates
│   │   │   ├── airports.py     # Confirmed airport hub data
│   │   │   ├── areas.py        # Service area listings
│   │   │   ├── contact.py      # Contact inbox & message handling
│   │   │   ├── chat.py         # AI Concierge endpoint
│   │   │   ├── stats.py        # Real calculated admin statistics
│   │   │   └── deps.py         # Auth dependency (get_current_user)
│   │   ├── core/
│   │   │   ├── config.py       # Configuration & environment settings
│   │   │   ├── database.py     # SQLAlchemy engine & session maker
│   │   │   └── security.py     # Password hashing & JWT token handling
│   │   ├── data/
│   │   │   └── seed.py         # Seed verified company, fleet & services data
│   │   ├── models/
│   │   │   └── models.py       # SQLAlchemy ORM database models
│   │   ├── schemas/
│   │   │   └── schemas.py      # Pydantic v2 validation schemas
│   │   ├── services/
│   │   │   ├── ai_concierge.py # AI concierge service (Gemini + fallback)
│   │   │   └── email_service.py# Transactional HTML email templates
│   │   └── main.py             # FastAPI application entrypoint
│   ├── requirements.txt
│   └── run.py                  # Backend server runner (port 8000)
├── frontend/
│   ├── public/
│   │   ├── robots.txt          # Search engine crawler guidelines
│   │   └── sitemap.xml         # XML sitemap for Google/Bing indexing
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, Button, SectionHeading, Badge, Modal, PageHero
│   │   │   ├── home/           # HeroSection, TrustBar, ServicesPreview, FleetShowcase, etc.
│   │   │   ├── booking/        # MultiStepBookingForm
│   │   │   ├── chatbot/        # LuxuryConciergeChat
│   │   │   └── admin/          # AdminLayout, StatCard, BookingDetailModal
│   │   ├── context/            # AuthContext (JWT session management)
│   │   ├── pages/              # 9 core public pages + 404
│   │   │   ├── HomePage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── ServicesPage.jsx
│   │   │   ├── AirportPage.jsx
│   │   │   ├── ServiceAreasPage.jsx
│   │   │   ├── FleetPage.jsx
│   │   │   ├── QuotePage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── PrivacyTermsPage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   └── admin/          # AdminLoginPage, AdminDashboardPage, AdminBookingsPage, etc.
│   │   ├── services/
│   │   │   └── api.js          # Centralized Axios client & API handlers
│   │   ├── App.jsx             # React router & layout configuration
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Tailwind directives & luxury utilities
│   ├── tailwind.config.js      # Luxury design tokens
│   ├── vite.config.js          # Proxy & chunk splitting configuration
│   └── package.json
└── README.md
```

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- **Node.js**: v18+ (tested on v20.20)
- **Python**: 3.10+ (tested on 3.12)

### 1. Start the Backend API

```bash
cd backend

# Create virtual environment (if not already created)
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\Activate.ps1
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the FastAPI server
python run.py
```
Backend will start on `http://127.0.0.1:8000`. Database tables and initial verified records will seed automatically on first run. Interactive Swagger API documentation is available at `http://127.0.0.1:8000/docs`.

### 2. Start the Frontend Development Server

In a new terminal window:
```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server with proxy to backend
npm run dev
```
Open `http://localhost:5173` in your browser.

---

## 🔐 Admin Console & Credentials

Access the executive administrative portal at:
👉 **`http://localhost:5173/admin/login`**

- **Default Administrator Email**: `admin@everestlimo.com`
- **Default Password**: `EverestLimo2026!`

The Admin Dashboard provides real-time operational control:
1. **Live Booking Enquiries**: Filter by status (`New`, `Reviewing`, `Quote Sent`, `Confirmed`, etc.), search by passenger name/phone/reference code, open individual booking modal, update status, add dispatch notes, and record quoted estimates.
2. **Fleet Management**: Inspect vehicles, update specifications, and toggle public website visibility.
3. **Services & Airports**: Manage descriptions and terminal pickup instructions.
4. **Client Messages**: Inbound contact inquiries with mark-as-read tracking.

---

## 📋 Verified Business Information

- **Company Name**: Everest Executive Limo LLC
- **Operational Hub**: Harrisburg, Pennsylvania
- **Service Coverage**: Pennsylvania (Harrisburg, Hershey, Lancaster, York, Philadelphia), New York City, New Jersey, and Washington D.C.
- **Serviced Airports**:
  - `MDT` — Harrisburg International Airport
  - `PHL` — Philadelphia International Airport
  - `EWR` — Newark Liberty International Airport
  - `JFK` — John F. Kennedy International Airport
  - `LGA` — LaGuardia Airport
- **Fleet Specifications**:
  - **Executive Sedan**: Mercedes-Benz S-Class / Cadillac CT6 (Up to 3 passengers, 3 bags)
  - **Luxury SUV**: Cadillac Escalade ESV / Lincoln Navigator L (Up to 6 passengers, 6 bags)
  - **Executive Sprinter**: Mercedes-Benz Sprinter Jet Class (Up to 14 passengers, 12 bags)
  - **Stretch Limousine**: Lincoln MKT Stretch (Up to 8-10 passengers, 6 bags)
- **Direct Dispatch Telephone**: +1 (717) 555-0199
- **Email Inquiries**: reservations@everestlimo.com

---

## 🛡️ Booking Enquiry Transparency

Submitting a request through the website constitutes a formal **quotation enquiry**, not an automated credit card reservation. The customer receives an immediate confirmation with an assigned tracking reference (e.g. `EEL-2026-XXXXX`), explaining that our operations team is reviewing the route and calculating an all-inclusive quotation.

