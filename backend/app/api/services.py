from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..core.database import get_db
from ..models.models import Service, User
from ..schemas.schemas import ServiceCreate, ServiceUpdate, ServiceResponse
from .deps import get_current_user

router = APIRouter(prefix="/services", tags=["Services"])

@router.get("", response_model=List[ServiceResponse])
def get_services(db: Session = Depends(get_db)) -> Any:
    """
    Public endpoint: Get all active services.
    """
    return db.query(Service).order_by(Service.sort_order).all()

@router.get("/{slug_or_id}", response_model=ServiceResponse)
def get_service(slug_or_id: str, db: Session = Depends(get_db)) -> Any:
    if slug_or_id.isdigit():
        service = db.query(Service).filter(Service.id == int(slug_or_id)).first()
    else:
        service = db.query(Service).filter(Service.slug == slug_or_id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return service

@router.post("", response_model=ServiceResponse, status_code=status.HTTP_201_CREATED)
def create_service(
    service_in: ServiceCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    service = Service(**service_in.model_dump())
    db.add(service)
    db.commit()
    db.refresh(service)
    return service

@router.put("/{id}", response_model=ServiceResponse)
def update_service(
    id: int,
    service_in: ServiceUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    service = db.query(Service).filter(Service.id == id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
        
    for field, val in service_in.model_dump(exclude_unset=True).items():
        setattr(service, field, val)
        
    db.commit()
    db.refresh(service)
    return service

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_service(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> None:
    service = db.query(Service).filter(Service.id == id).first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    db.delete(service)
    db.commit()

