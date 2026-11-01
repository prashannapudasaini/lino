import os
from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Everest Executive Limo LLC API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "everest_executive_limo_luxury_secret_jwt_key_2026_secured")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Admin Seed
    DEFAULT_ADMIN_EMAIL: str = os.getenv("ADMIN_EMAIL", "admin@everestlimo.com")
    DEFAULT_ADMIN_PASSWORD: str = os.getenv("ADMIN_PASSWORD", "EverestLimo2026!")
    DEFAULT_ADMIN_NAME: str = "Everest Executive Administrator"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./everest_limo.db")
    
    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "*"
    ]
    
    # Gemini AI API Key (optional fallback if not provided)
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    
    # Contact & Business details
    BUSINESS_PHONE: str = "+1 (717) 555-0199"
    BUSINESS_EMAIL: str = "reservations@everestlimo.com"
    BUSINESS_LOCATION: str = "Harrisburg, PA — Serving PA, MD, NJ, NY & DC"
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
