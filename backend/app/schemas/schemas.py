from typing import Optional, List
from datetime import datetime
from pydantic import BaseModel, EmailStr

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: EmailStr
    full_name: Optional[str]
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

# Booking Enquiry Schemas
class BookingCreate(BaseModel):
    service_type: str
    pickup_location: str
    dropoff_location: str
    pickup_date: str
    pickup_time: str
    trip_type: Optional[str] = "one_way"
    return_date: Optional[str] = None
    return_time: Optional[str] = None
    
    passengers: int = 1
    luggage: int = 1
    vehicle_preference: Optional[str] = None
    special_requests: Optional[str] = None
    
    airport_code: Optional[str] = None
    flight_type: Optional[str] = None
    airline: Optional[str] = None
    flight_number: Optional[str] = None
    
    full_name: str
    email: EmailStr
    phone: str
    country_code: Optional[str] = "+1"
    customer_notes: Optional[str] = None

class BookingStatusUpdate(BaseModel):
    status: str
    internal_notes: Optional[str] = None
    estimated_quote: Optional[float] = None

class BookingResponse(BaseModel):
    id: int
    reference_code: str
    service_type: str
    pickup_location: str
    dropoff_location: str
    pickup_date: str
    pickup_time: str
    trip_type: str
    return_date: Optional[str]
    return_time: Optional[str]
    passengers: int
    luggage: int
    vehicle_preference: Optional[str]
    special_requests: Optional[str]
    airport_code: Optional[str]
    flight_type: Optional[str]
    airline: Optional[str]
    flight_number: Optional[str]
    full_name: str
    email: str
    phone: str
    country_code: str
    customer_notes: Optional[str]
    status: str
    internal_notes: Optional[str]
    estimated_quote: Optional[float]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

# Fleet Schemas
class FleetVehicleBase(BaseModel):
    name: str
    category: str
    subtitle: Optional[str] = None
    passenger_capacity: int
    luggage_capacity: int
    image_url: str
    gallery_json: Optional[str] = "[]"
    description: Optional[str] = None
    features_json: Optional[str] = "[]"
    hourly_rate_estimate: Optional[str] = None
    is_visible: bool = True
    sort_order: int = 0

class FleetVehicleCreate(FleetVehicleBase):
    pass

class FleetVehicleUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    subtitle: Optional[str] = None
    passenger_capacity: Optional[int] = None
    luggage_capacity: Optional[int] = None
    image_url: Optional[str] = None
    gallery_json: Optional[str] = None
    description: Optional[str] = None
    features_json: Optional[str] = None
    hourly_rate_estimate: Optional[str] = None
    is_visible: Optional[bool] = None
    sort_order: Optional[int] = None

class FleetVehicleResponse(FleetVehicleBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Service Schemas
class ServiceBase(BaseModel):
    title: str
    slug: str
    short_description: str
    full_description: str
    icon_name: Optional[str] = "Shield"
    image_url: Optional[str] = None
    features_json: Optional[str] = "[]"
    is_featured: bool = True
    sort_order: int = 0

class ServiceCreate(ServiceBase):
    pass

class ServiceUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    short_description: Optional[str] = None
    full_description: Optional[str] = None
    icon_name: Optional[str] = None
    image_url: Optional[str] = None
    features_json: Optional[str] = None
    is_featured: Optional[bool] = None
    sort_order: Optional[int] = None

class ServiceResponse(ServiceBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Airport Schemas
class AirportBase(BaseModel):
    code: str
    name: str
    city: str
    state: str
    description: Optional[str] = None
    terminal_info: Optional[str] = None
    is_primary: bool = True
    sort_order: int = 0

class AirportCreate(AirportBase):
    pass

class AirportUpdate(BaseModel):
    code: Optional[str] = None
    name: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    description: Optional[str] = None
    terminal_info: Optional[str] = None
    is_primary: Optional[bool] = None
    sort_order: Optional[int] = None

class AirportResponse(AirportBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Service Area Schemas
class ServiceAreaBase(BaseModel):
    name: str
    state: str
    region: Optional[str] = None
    description: Optional[str] = None
    key_cities_json: Optional[str] = "[]"
    is_active: bool = True
    sort_order: int = 0

class ServiceAreaCreate(ServiceAreaArea := ServiceAreaBase):
    pass

class ServiceAreaUpdate(BaseModel):
    name: Optional[str] = None
    state: Optional[str] = None
    region: Optional[str] = None
    description: Optional[str] = None
    key_cities_json: Optional[str] = None
    is_active: Optional[bool] = None
    sort_order: Optional[int] = None

class ServiceAreaResponse(ServiceAreaBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# Contact Message Schemas
class ContactMessageCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str

class ContactMessageResponse(BaseModel):
    id: int
    name: str
    email: str
    phone: Optional[str]
    subject: Optional[str]
    message: str
    is_read: bool
    responded_at: Optional[datetime]
    created_at: datetime

    class Config:
        from_attributes = True

# Chatbot Schemas
class ChatMessage(BaseModel):
    role: str # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    reply: str
    suggested_actions: Optional[List[str]] = []
    action_url: Optional[str] = None

# Dashboard Stats Schemas
class DashboardStats(BaseModel):
    total_enquiries: int
    new_enquiries: int
    reviewing: int
    quotes_sent: int
    confirmed: int
    completed: int
    total_vehicles: int
    total_services: int
    total_messages: int
    unread_messages: int

