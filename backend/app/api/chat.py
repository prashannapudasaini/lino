from typing import Any
from fastapi import APIRouter
from ..schemas.schemas import ChatRequest, ChatResponse
from ..services.ai_concierge import get_concierge_response

router = APIRouter(prefix="/chat", tags=["AI Concierge"])

@router.post("", response_model=ChatResponse)
def concierge_chat(request: ChatRequest) -> Any:
    """
    Public endpoint: Luxury AI Concierge assistant.
    Provides fast, accurate answers about Everest Executive Limo's services, airports,
    fleet, and quote process, while securely using Gemini or fallback matching.
    """
    history_dicts = [{"role": h.role, "content": h.content} for h in (request.history or [])]
    result = get_concierge_response(request.message, history=history_dicts)
    return ChatResponse(**result)
