from datetime import datetime
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from ..core.database import get_db
from ..models.models import ContactMessage, User
from ..schemas.schemas import ContactMessageCreate, ContactMessageResponse
from .deps import get_current_user

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.post("", response_model=ContactMessageResponse, status_code=status.HTTP_201_CREATED)
def submit_contact_message(
    msg_in: ContactMessageCreate,
    db: Session = Depends(get_db)
) -> Any:
    msg = ContactMessage(**msg_in.model_dump())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg

@router.get("", response_model=List[ContactMessageResponse])
def get_contact_messages(
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    current_user: User = Depends(get_current_user)
) -> Any:
    return db.query(ContactMessage).order_by(desc(ContactMessage.created_at)).offset(skip).limit(limit).all()

@router.patch("/{id}/read", response_model=ContactMessageResponse)
def mark_message_read(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> Any:
    msg = db.query(ContactMessage).filter(ContactMessage.id == id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_read = True
    msg.responded_at = datetime.utcnow()
    db.commit()
    db.refresh(msg)
    return msg

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contact_message(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
) -> None:
    msg = db.query(ContactMessage).filter(ContactMessage.id == id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(msg)
    db.commit()

