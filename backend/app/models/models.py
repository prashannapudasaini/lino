from datetime import datetime
from sqlalchemy import Column, Integer, String, Text, Boolean, Float, DateTime
from ..core.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=True)
    role = Column(String(50), default="admin")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    reference_code = Column(String(30), unique=True, index=True, nullable=False)
    
    # Journey Details
    service_type = Column(String(100), nullable=False)
    pickup_location = Column(String(255), nullable=False)
    dropoff_location = Column(String(255), nullable=False)
    pickup_date = Column(String(50), nullable=False)
    pickup_time = Column(String(50), nullable=False)
    trip_type = Column(String(50), default="one_way")
    return_date = Column(String(50), nullable=True)
    return_time = Column(String(50), nullable=True)
    
    # Passenger & Vehicle
    passengers = Column(Integer, default=1)
    luggage = Column(Integer, default=1)
    vehicle_preference = Column(String(100), nullable=True)
    special_requests = Column(Text, nullable=True)
    
    # Airport Details (if applicable)
    airport_code = Column(String(20), nullable=True)
    flight_type = Column(String(30), nullable=True)
    airline = Column(String(100), nullable=True)
    flight_number = Column(String(50), nullable=True)
    
    # Customer Details
    full_name = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=False)
    country_code = Column(String(10), default="+1")
    customer_notes = Column(Text, nullable=True)
    
    # Admin & Operational Status
    # Status options: "New", "Reviewing", "Quote Sent", "Awaiting Response", "Confirmed", "Completed", "Cancelled", "Rejected"
    status = Column(String(50), default="New", index=True)
    internal_notes = Column(Text, nullable=True)
    estimated_quote = Column(Float, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class FleetVehicle(Base):
    __tablename__ = "fleet_vehicles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    category = Column(String(100), nullable=False)
    subtitle = Column(String(255), nullable=True)
    passenger_capacity = Column(Integer, nullable=False)
    luggage_capacity = Column(Integer, nullable=False)
    image_url = Column(String(500), nullable=False)
    gallery_json = Column(Text, nullable=True) # JSON array of image URLs
    description = Column(Text, nullable=True)
    features_json = Column(Text, nullable=True) # JSON array of strings
    hourly_rate_estimate = Column(String(50), nullable=True)
    is_visible = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class Service(Base):
    __tablename__ = "services"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(150), nullable=False)
    slug = Column(String(100), unique=True, index=True, nullable=False)
    short_description = Column(String(300), nullable=False)
    full_description = Column(Text, nullable=False)
    icon_name = Column(String(50), nullable=True)
    image_url = Column(String(500), nullable=True)
    features_json = Column(Text, nullable=True) # JSON list
    is_featured = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class Airport(Base):
    __tablename__ = "airports"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(10), unique=True, index=True, nullable=False)
    name = Column(String(200), nullable=False)
    city = Column(String(100), nullable=False)
    state = Column(String(50), nullable=False)
    description = Column(Text, nullable=True)
    terminal_info = Column(Text, nullable=True)
    is_primary = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class ServiceArea(Base):
    __tablename__ = "service_areas"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    state = Column(String(50), nullable=False)
    region = Column(String(100), nullable=True)
    description = Column(Text, nullable=True)
    key_cities_json = Column(Text, nullable=True) # JSON list
    is_active = Column(Boolean, default=True)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(150), nullable=False)
    email = Column(String(255), nullable=False)
    phone = Column(String(50), nullable=True)
    subject = Column(String(200), nullable=True)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    responded_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class SiteSetting(Base):
    __tablename__ = "site_settings"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, index=True, nullable=False)
    value = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

