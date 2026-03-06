from fastapi import APIRouter

from schemas import ChatRequest, ChatResponse
from services.chatbot_logic import answer_question

router = APIRouter(prefix="/chatbot", tags=["chatbot"])


@router.post("/ask", response_model=ChatResponse)
def ask(payload: ChatRequest) -> ChatResponse:
    answer = answer_question(payload.question, payload.language)
    return ChatResponse(answer=answer, language=payload.language)
