import json
from sqlalchemy.orm import Session
from ..core.config import settings
from ..core.security import get_password_hash
from ..models.models import User, FleetVehicle, Service, Airport, ServiceArea, Booking

def seed_database(db: Session):
    # 1. Seed Admin User
    admin = db.query(User).filter(User.email == settings.DEFAULT_ADMIN_EMAIL).first()
    if not admin:
        admin = User(
            email=settings.DEFAULT_ADMIN_EMAIL,
            hashed_password=get_password_hash(settings.DEFAULT_ADMIN_PASSWORD),
            full_name=settings.DEFAULT_ADMIN_NAME,
            role="superadmin",
            is_active=True
        )
        db.add(admin)

    # 2. Seed Fleet Vehicles
    if db.query(FleetVehicle).count() == 0:
        vehicles = [
            FleetVehicle(
                name="Executive Luxury Sedan",
                category="Sedan",
                subtitle="Mercedes-Benz S-Class / Cadillac CT6",
                passenger_capacity=3,
                luggage_capacity=3,
                image_url="https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
                gallery_json=json.dumps([
                    "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=1200&q=80"
                ]),
                description="The pinnacle of executive comfort. Engineered for business leaders and discerning individual travelers seeking whisper-quiet performance, handcrafted leather seating, and seamless connectivity.",
                features_json=json.dumps([
                    "Complimentary High-Speed Wi-Fi",
                    "Handcrafted Nappa Leather Seating",
                    "Individual Rear Climate Controls",
                    "Acoustic Noise-Insulated Glass",
                    "Device Charging Ports & Ambient Lighting",
                    "Chilled Bottled Water & Daily Financial Press"
                ]),
                hourly_rate_estimate="Starting from $95/hr",
                is_visible=True,
                sort_order=1
            ),
            FleetVehicle(
                name="Executive Luxury SUV",
                category="SUV",
                subtitle="Cadillac Escalade ESV / Lincoln Navigator L",
                passenger_capacity=6,
                luggage_capacity=6,
                image_url="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
                gallery_json=json.dumps([
                    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
                    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
                ]),
                description="Commanding road presence paired with expansive first-class space. Ideal for executive delegations, airport transfers with substantial luggage, and VIP family travel across regional corridors.",
                features_json=json.dumps([
                    "Extended Wheelbase with Superior Luggage Capacity",
                    "Heated & Ventilated Second-Row Captain Chairs",
                    "Rear Seat Entertainment Displays",
                    "Panoramic Sunroof & Privacy Tint",
                    "All-Wheel Drive Performance in All Seasons",
                    "Bespoke Interior LED Lighting & Refreshments"
                ]),
                hourly_rate_estimate="Starting from $120/hr",
                is_visible=True,
                sort_order=2
            ),
            FleetVehicle(
                name="Mercedes-Benz Executive Sprinter",
                category="Van",
                subtitle="Executive Jet Class Custom Sprinter",
                passenger_capacity=14,
                luggage_capacity=12,
                image_url="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80",
                gallery_json=json.dumps([
                    "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=1200&q=80"
                ]),
                description="A private jet cabin on wheels. Designed for executive teams, corporate roadshows, and discerning group itineraries requiring full standing height, work desks, and supreme comfort.",
                features_json=json.dumps([
                    "6'4\" Full Standing Headroom Cabin",
                    "Custom Ergonomic Leather Captain Recliners",
                    "Retractable Executive Conference Worktables",
                    "43-inch 4K Smart Media Monitor with HDMI Input",
                    "Dedicated High-Capacity Luggage Compartment",
                    "Privacy Partition & Enhanced Sound Insulation"
                ]),
                hourly_rate_estimate="Starting from $165/hr",
                is_visible=True,
                sort_order=3
            ),
            FleetVehicle(
                name="Executive Stretch Limousine",
                category="Limousine",
                subtitle="Lincoln MKT Presidential Stretch",
                passenger_capacity=8,
                luggage_capacity=6,
                image_url="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
                gallery_json=json.dumps([
                    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80"
                ]),
                description="Timeless elegance and celebratory refinement. Tailored for special occasions, high-profile galas, weddings, and prestigious evenings where arriving in iconic style matters.",
                features_json=json.dumps([
                    "Custom J-Seating in Hand-Stitched Leather",
                    "Integrated Champagne & Beverage Console",
                    "Fiber-Optic Starlight Ceiling & Mood Lighting",
                    "Bluetooth Surround Sound Acoustic System",
                    "Total Driver Privacy Partition",
                    "Heavy-Duty Deep Tinted Privacy Windows"
                ]),
                hourly_rate_estimate="Starting from $145/hr",
                is_visible=True,
                sort_order=4
            )
        ]
        db.add_all(vehicles)

    # 3. Seed Services
    if db.query(Service).count() == 0:
        services = [
            Service(
                title="Airport Transportation",
                slug="airport-transportation",
                short_description="Seamless airport arrivals and executive departures with curbside coordination, flight schedule tracking, and terminal meet-and-greet.",
                full_description="Everest Executive Limo eliminates the stress of airport transit across MDT, PHL, JFK, LGA, and EWR. Your chauffeur monitors your flight status, welcomes you at baggage claim or curbside, assists with all luggage, and escorts you smoothly to your private vehicle.",
                icon_name="Plane",
                image_url="https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=1200&q=80",
                features_json=json.dumps([
                    "Live Inbound Flight Tracking & Proactive Adjustments",
                    "Curbside or Inside Terminal Meet & Greet with Name Sign",
                    "Complimentary 45-Minute Waiting Period on Commercial Arrivals",
                    "Full Luggage Assistance from Baggage Claim to Trunk",
                    "Direct Regional Connections to Hotels, Offices & Residencies"
                ]),
                is_featured=True,
                sort_order=1
            ),
            Service(
                title="Corporate & Executive Travel",
                slug="corporate-travel",
                short_description="Tailored executive mobility for corporate meetings, multi-stop roadshows, and discerning executives who value privacy and punctuality.",
                full_description="Designed specifically for corporate executives, visiting dignitaries, and business professionals who demand an uninterrupted mobile workspace. Travel between meetings in complete confidentiality and comfort.",
                icon_name="Briefcase",
                image_url="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
                features_json=json.dumps([
                    "Dedicated Account Coordination for Corporate Accounts",
                    "Quiet, Confidential Cabin Environment for Business Calls",
                    "High-Speed Mobile Connectivity & In-Cabin Power",
                    "Multi-City Roadshow Itinerary Management",
                    "Strict Professional Non-Disclosure Protocols"
                ]),
                is_featured=True,
                sort_order=2
            ),
            Service(
                title="Private Hourly Chauffeur",
                slug="hourly-chauffeur",
                short_description="Dedicated chauffeur and premium luxury vehicle at your continuous disposal for meetings, dinners, or bespoke regional itineraries.",
                full_description="Experience total schedule freedom with our as-directed hourly service. Your chauffeur remains on standby wherever your day or evening takes you, ready to depart at your command.",
                icon_name="Clock",
                image_url="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
                features_json=json.dumps([
                    "Flexible As-Directed Itineraries on Demand",
                    "Chauffeur Remains Stationed On-Site at All Stops",
                    "Zero Parking Hassles or City Congestion Delays",
                    "Ideal for Dinners, Shopping, Medical Visits & Roadshows",
                    "Seamless Extension of Hours Upon Request"
                ]),
                is_featured=True,
                sort_order=3
            ),
            Service(
                title="Special Events Transportation",
                slug="special-events",
                short_description="Sophisticated transportation for galas, milestone celebrations, weddings, and high-profile private occasions.",
                full_description="Elevate your most cherished milestones. From weddings and anniversary celebrations to black-tie charity galas, our pristine fleet and immaculately attired chauffeurs provide red-carpet elegance from departure to arrival.",
                icon_name="Award",
                image_url="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
                features_json=json.dumps([
                    "Red-Carpet Service & Impeccable Chauffeur Presentation",
                    "Bridal Party & VIP Group Logistics Coordination",
                    "Pristine Vehicle Detailing Before Every Event",
                    "Customized Timelines Coordinated with Event Planners",
                    "Seamless Staging & VIP Drop-off Protocols"
                ]),
                is_featured=True,
                sort_order=4
            )
        ]
        db.add_all(services)

    # 4. Seed Airports
    if db.query(Airport).count() == 0:
        airports = [
            Airport(
                code="MDT",
                name="Harrisburg International Airport",
                city="Harrisburg (Middletown)",
                state="Pennsylvania",
                description="Our primary regional airport hub. Quick, hassle-free transfers connecting Central Pennsylvania to corporate headquarters and luxury residences.",
                terminal_info="Terminal Meet & Greet at lower level baggage claim or curbside pickup outside passenger terminal.",
                is_primary=True,
                sort_order=1
            ),
            Airport(
                code="PHL",
                name="Philadelphia International Airport",
                city="Philadelphia",
                state="Pennsylvania",
                description="Comprehensive service connecting Greater Philadelphia, Center City, and regional Pennsylvania hubs with Terminals A through F.",
                terminal_info="Curbside passenger pick-up zones located outside each terminal or baggage claim baggage level escort.",
                is_primary=True,
                sort_order=2
            ),
            Airport(
                code="EWR",
                name="Newark Liberty International Airport",
                city="Newark / New York Metro",
                state="New Jersey",
                description="Major transatlantic hub with direct luxury chauffeured transit to Central Pennsylvania, Philadelphia, and Manhattan.",
                terminal_info="Serving Terminals A, B, and C with expedited passenger meet-and-greet and private limousine staging.",
                is_primary=True,
                sort_order=3
            ),
            Airport(
                code="JFK",
                name="John F. Kennedy International Airport",
                city="Queens, New York",
                state="New York",
                description="Premier international gateway. Executive long-distance and regional transfers tailored to corporate and private VIP travelers.",
                terminal_info="Coordinated limousine pickup outside Terminals 1, 4, 5, 7, and 8 with flight tracking.",
                is_primary=True,
                sort_order=4
            ),
            Airport(
                code="LGA",
                name="LaGuardia Airport",
                city="Queens, New York",
                state="New York",
                description="Servicing modern Terminals A, B, and C with seamless domestic business travel connections between New York and Pennsylvania.",
                terminal_info="Designated App-based and Luxury Vehicle pickup garages with chauffeur assistance.",
                is_primary=True,
                sort_order=5
            )
        ]
        db.add_all(airports)

    # 5. Seed Service Areas
    if db.query(ServiceArea).count() == 0:
        areas = [
            ServiceArea(
                name="Central Pennsylvania & Capitol Region",
                state="Pennsylvania",
                region="Mid-State",
                description="Our home base and operational heart. Full coverage across Harrisburg, Hershey, Lancaster, York, Mechanicsburg, and Carlisle.",
                key_cities_json=json.dumps([
                    "Harrisburg (State Capitol)", "Hershey (Medical Center & Resorts)",
                    "Lancaster", "York", "Mechanicsburg", "Camp Hill", "Carlisle", "Lebanon"
                ]),
                is_active=True,
                sort_order=1
            ),
            ServiceArea(
                name="Greater Philadelphia & Main Line",
                state="Pennsylvania",
                region="Delaware Valley",
                description="Daily executive transfers to Center City Philadelphia, King of Prussia, Conshohocken, and Main Line communities.",
                key_cities_json=json.dumps([
                    "Center City Philadelphia", "King of Prussia", "Wayne / Main Line",
                    "Bryn Mawr", "Chesterbrook", "Radnor", "West Chester", "Bucks County"
                ]),
                is_active=True,
                sort_order=2
            ),
            ServiceArea(
                name="New York City & Tri-State Corridor",
                state="New York",
                region="Metropolitan",
                description="Long-distance and intercity transfers directly to Manhattan financial districts, Midtown luxury hotels, and NYC airports.",
                key_cities_json=json.dumps([
                    "Manhattan (Midtown & Wall St)", "Brooklyn", "Queens", "Long Island", "White Plains"
                ]),
                is_active=True,
                sort_order=3
            ),
            ServiceArea(
                name="New Jersey Corridor",
                state="New Jersey",
                region="Garden State",
                description="Connecting corporate campuses across Princeton, Trenton, Newark, and Jersey City with Pennsylvania and New York.",
                key_cities_json=json.dumps([
                    "Princeton", "Trenton", "Newark", "Jersey City", "Hoboken", "Cherry Hill", "Morristown"
                ]),
                is_active=True,
                sort_order=4
            ),
            ServiceArea(
                name="Washington D.C. & Capital Region",
                state="District of Columbia",
                region="Mid-Atlantic",
                description="Executive transportation for government contractors, embassies, legal firms, and private delegations to Washington D.C.",
                key_cities_json=json.dumps([
                    "Downtown Washington D.C.", "Capitol Hill", "Georgetown", "Arlington, VA", "Bethesda, MD"
                ]),
                is_active=True,
                sort_order=5
            )
        ]
        db.add_all(areas)

    # 6. Seed a sample booking so admin dashboard immediately displays real records
    if db.query(Booking).count() == 0:
        sample_booking = Booking(
            reference_code="EEL-2026-INIT1",
            service_type="Airport Transportation",
            pickup_location="Harrisburg Hilton, 1 N 2nd St, Harrisburg, PA",
            dropoff_location="Philadelphia International Airport (PHL), Terminal A",
            pickup_date="2026-11-05",
            pickup_time="07:30 AM",
            trip_type="one_way",
            passengers=2,
            luggage=3,
            vehicle_preference="Executive Luxury Sedan",
            special_requests="Traveling for transatlantic flight to London. Please provide chilled water and assist with baggage.",
            airport_code="PHL",
            flight_type="departure",
            airline="British Airways",
            flight_number="BA66",
            full_name="Jonathan Vance",
            email="jvance.corp@example.com",
            phone="+1 (717) 555-4921",
            country_code="+1",
            status="New",
            internal_notes="High priority client. Assigned senior executive chauffeur.",
            estimated_quote=245.00
        )
        db.add(sample_booking)

    db.commit()

