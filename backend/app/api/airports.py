from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import Airport, User
from ..schemas.schemas import AirportCreate, AirportUpdate, AirportResponse
from .deps import get_current_user

router = APIRouter(prefix="/airports", tags=["Airports"])

@router.get("", response_model=List[AirportResponse])
def get_airports(db: Session = Depends(get_db)) -> Any:
    return db.query(Airport).order_by(Airport.sort_order).all()

@router.post("", response_model=AirportResponse, status_code=status.HTTP_201_CREATED)
def create_airport(
    airport_in: AirportCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    airport = Airport(**airport_in.model_dump())
    db.add(airport)
    db.commit()
    db.refresh(airport)
    return airport

@router.put("/{id}", response_model=AirportResponse)
def update_airport(
    id: int,
    airport_in: AirportUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    airport = db.query(Airport).filter(Airport.id == id).first()
    if not airport:
        raise HTTPException(status_code=404, detail="Airport not found")
        
    for field, val in airport_in.model_dump(exclude_unset=True).items():
        setattr(airport, field, val)
        
    db.commit()
    db.refresh(airport)
    return airport

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_airport(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> None:
    airport = db.query(Airport).filter(Airport.id == id).first()
    if not airport:
        raise HTTPException(status_code=404, detail="Airport not found")
    db.delete(airport)
    db.commit()
