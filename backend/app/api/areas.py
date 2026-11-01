from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import ServiceArea, User
from ..schemas.schemas import ServiceAreaCreate, ServiceAreaUpdate, ServiceAreaResponse
from .deps import get_current_user

router = APIRouter(prefix="/service-areas", tags=["Service Areas"])

@router.get("", response_model=List[ServiceAreaResponse])
def get_service_areas(db: Session = Depends(get_db)) -> Any:
    return db.query(ServiceArea).filter(ServiceArea.is_active == True).order_by(ServiceArea.sort_order).all()

@router.post("", response_model=ServiceAreaResponse, status_code=status.HTTP_201_CREATED)
def create_service_area(
    area_in: ServiceAreaCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    area = ServiceArea(**area_in.model_dump())
    db.add(area)
    db.commit()
    db.refresh(area)
    return area

@router.put("/{id}", response_model=ServiceAreaResponse)
def update_service_area(
    id: int,
    area_in: ServiceAreaUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    area = db.query(ServiceArea).filter(ServiceArea.id == id).first()
    if not area:
        raise HTTPException(status_code=404, detail="Service area not found")
        
    for field, val in area_in.model_dump(exclude_unset=True).items():
        setattr(area, field, val)
        
    db.commit()
    db.refresh(area)
    return area

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service_area(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> None:
    area = db.query(ServiceArea).filter(ServiceArea.id == id).first()
    if not area:
        raise HTTPException(status_code=404, detail="Service area not found")
    db.delete(area)
    db.commit()

