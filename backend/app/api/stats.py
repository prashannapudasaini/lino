from typing import Any
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from ..core.database import get_db
from ..models.models import Booking, FleetVehicle, Service, ContactMessage, User
from ..schemas.schemas import DashboardStats
from .deps import get_current_user

router = APIRouter(prefix="/stats", tags=["Admin Statistics"])

@router.get("", response_model=DashboardStats)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Calculates live operational statistics strictly from actual database records.
    """
    total_enquiries = db.query(func.count(Booking.id)).scalar() or 0
    new_enquiries = db.query(func.count(Booking.id)).filter(Booking.status == "New").scalar() or 0
    reviewing = db.query(func.count(Booking.id)).filter(Booking.status == "Reviewing").scalar() or 0
    quotes_sent = db.query(func.count(Booking.id)).filter(Booking.status == "Quote Sent").scalar() or 0
    confirmed = db.query(func.count(Booking.id)).filter(Booking.status == "Confirmed").scalar() or 0
    completed = db.query(func.count(Booking.id)).filter(Booking.status == "Completed").scalar() or 0
    
    total_vehicles = db.query(func.count(FleetVehicle.id)).scalar() or 0
    total_services = db.query(func.count(Service.id)).scalar() or 0
    total_messages = db.query(func.count(ContactMessage.id)).scalar() or 0
    unread_messages = db.query(func.count(ContactMessage.id)).filter(ContactMessage.is_read == False).scalar() or 0

    return DashboardStats(
        total_enquiries=total_enquiries,
        new_enquiries=new_enquiries,
        reviewing=reviewing,
        quotes_sent=quotes_sent,
        confirmed=confirmed,
        completed=completed,
        total_vehicles=total_vehicles,
        total_services=total_services,
        total_messages=total_messages,
        unread_messages=unread_messages
    )
