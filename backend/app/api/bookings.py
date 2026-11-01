import random
import string
from datetime import datetime
from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from sqlalchemy import or_, desc

from ..core.database import get_db
from ..models.models import Booking, User
from ..schemas.schemas import BookingCreate, BookingResponse, BookingStatusUpdate
from ..services.email_service import send_booking_acknowledgement_email, send_business_notification_email
from .deps import get_current_user

router = APIRouter(prefix="/bookings", tags=["Bookings"])

def generate_reference_code() -> str:
    year = datetime.utcnow().year
    chars = string.ascii_uppercase + string.digits
    suffix = ''.join(random.choices(chars, k=5))
    return f"EEL-{year}-{suffix}"

@router.post("", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
def create_booking_enquiry(
    booking_in: BookingCreate,
    db: Session = Depends(get_db)
) -> Any:
    """
    Public endpoint: Submit a new booking enquiry / quotation request.
    Generates reference code, stores in DB, sends emails.
    """
    # Ensure unique reference code
    ref_code = generate_reference_code()
    while db.query(Booking).filter(Booking.reference_code == ref_code).first():
        ref_code = generate_reference_code()

    booking = Booking(
        reference_code=ref_code,
        service_type=booking_in.service_type,
        pickup_location=booking_in.pickup_location,
        dropoff_location=booking_in.dropoff_location,
        pickup_date=booking_in.pickup_date,
        pickup_time=booking_in.pickup_time,
        trip_type=booking_in.trip_type or "one_way",
        return_date=booking_in.return_date,
        return_time=booking_in.return_time,
        passengers=booking_in.passengers,
        luggage=booking_in.luggage,
        vehicle_preference=booking_in.vehicle_preference,
        special_requests=booking_in.special_requests,
        airport_code=booking_in.airport_code,
        flight_type=booking_in.flight_type,
        airline=booking_in.airline,
        flight_number=booking_in.flight_number,
        full_name=booking_in.full_name,
        email=booking_in.email,
        phone=booking_in.phone,
        country_code=booking_in.country_code or "+1",
        customer_notes=booking_in.customer_notes,
        status="New"
    )
    
    db.add(booking)
    db.commit()
    db.refresh(booking)

    # Trigger notifications
    booking_dict = {
        "reference_code": booking.reference_code,
        "full_name": booking.full_name,
        "email": booking.email,
        "phone": booking.phone,
        "pickup_location": booking.pickup_location,
        "dropoff_location": booking.dropoff_location,
        "pickup_date": booking.pickup_date,
        "pickup_time": booking.pickup_time,
        "service_type": booking.service_type,
        "vehicle_preference": booking.vehicle_preference,
        "passengers": booking.passengers,
        "luggage": booking.luggage,
        "airport_code": booking.airport_code,
        "flight_number": booking.flight_number,
    }
    send_booking_acknowledgement_email(booking_dict)
    send_business_notification_email(booking_dict)

    return booking

@router.get("", response_model=List[BookingResponse])
def get_bookings(
    db: Session = Depends(get_db),
    status: Optional[str] = Query(None, description="Filter by status"),
    search: Optional[str] = Query(None, description="Search by name, email, phone, reference, or location"),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Admin endpoint: Retrieve booking enquiries with filters.
    """
    query = db.query(Booking)
    
    if status and status.lower() != "all":
        query = query.filter(Booking.status == status)
        
    if search:
        search_fmt = f"%{search}%"
        query = query.filter(
            or_(
                Booking.reference_code.ilike(search_fmt),
                Booking.full_name.ilike(search_fmt),
                Booking.email.ilike(search_fmt),
                Booking.phone.ilike(search_fmt),
                Booking.pickup_location.ilike(search_fmt),
                Booking.dropoff_location.ilike(search_fmt)
            )
        )
        
    return query.order_by(desc(Booking.created_at)).offset(skip).limit(limit).all()

@router.get("/{id}", response_model=BookingResponse)
def get_booking_by_id(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    booking = db.query(Booking).filter(Booking.id == id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking enquiry not found")
    return booking

@router.patch("/{id}", response_model=BookingResponse)
def update_booking_status(
    id: int,
    status_update: BookingStatusUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Admin endpoint: Update booking status, internal dispatch notes, or quoted price.
    """
    booking = db.query(Booking).filter(Booking.id == id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking enquiry not found")
        
    booking.status = status_update.status
    if status_update.internal_notes is not None:
        booking.internal_notes = status_update.internal_notes
    if status_update.estimated_quote is not None:
        booking.estimated_quote = status_update.estimated_quote
        
    db.commit()
    db.refresh(booking)
    return booking

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_booking(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> None:
    booking = db.query(Booking).filter(Booking.id == id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking enquiry not found")
    db.delete(booking)
    db.commit()
