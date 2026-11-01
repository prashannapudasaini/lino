from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import FleetVehicle, User
from ..schemas.schemas import FleetVehicleCreate, FleetVehicleUpdate, FleetVehicleResponse
from .deps import get_current_user

router = APIRouter(prefix="/fleet", tags=["Fleet"])

@router.get("", response_model=List[FleetVehicleResponse])
def get_public_fleet(db: Session = Depends(get_db)) -> Any:
    """
    Public endpoint: Get all visible fleet vehicles.
    """
    return db.query(FleetVehicle).filter(FleetVehicle.is_visible == True).order_by(FleetVehicle.sort_order).all()

@router.get("/all", response_model=List[FleetVehicleResponse])
def get_all_fleet_admin(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Admin endpoint: Get all fleet vehicles including hidden ones.
    """
    return db.query(FleetVehicle).order_by(FleetVehicle.sort_order).all()

@router.get("/{id}", response_model=FleetVehicleResponse)
def get_vehicle_by_id(id: int, db: Session = Depends(get_db)) -> Any:
    vehicle = db.query(FleetVehicle).filter(FleetVehicle.id == id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return vehicle

@router.post("", response_model=FleetVehicleResponse, status_code=status.HTTP_201_CREATED)
def create_vehicle(
    vehicle_in: FleetVehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    vehicle = FleetVehicle(**vehicle_in.model_dump())
    db.add(vehicle)
    db.commit()
    db.refresh(vehicle)
    return vehicle

@router.put("/{id}", response_model=FleetVehicleResponse)
def update_vehicle(
    id: int,
    vehicle_in: FleetVehicleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    vehicle = db.query(FleetVehicle).filter(FleetVehicle.id == id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
        
    update_data = vehicle_in.model_dump(exclude_unset=True)
    for field, val in update_data.items():
        setattr(vehicle, field, val)
        
    db.commit()
    db.refresh(vehicle)
    return vehicle

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vehicle(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> None:
    vehicle = db.query(FleetVehicle).filter(FleetVehicle.id == id).first()
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    db.delete(vehicle)
    db.commit()

