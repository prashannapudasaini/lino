import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .core.config import settings
from .core.database import engine, Base, SessionLocal
from .data.seed import seed_database
from .api import auth, bookings, fleet, services, airports, areas, contact, chat, stats

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("everest_limo")

# Create tables
Base.metadata.create_all(bind=engine)

# Seed initial verified business data
with SessionLocal() as db:
    try:
        seed_database(db)
        logger.info("Everest Executive Limo database initialized and verified.")
    except Exception as e:
        logger.error(f"Error during initial seed: {e}")

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Production API for Everest Executive Limo LLC Luxury Chauffeur & Booking Management System."
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allows dev and prod origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(bookings.router, prefix=settings.API_V1_STR)
app.include_router(fleet.router, prefix=settings.API_V1_STR)
app.include_router(services.router, prefix=settings.API_V1_STR)
app.include_router(airports.router, prefix=settings.API_V1_STR)
app.include_router(areas.router, prefix=settings.API_V1_STR)
app.include_router(contact.router, prefix=settings.API_V1_STR)
app.include_router(chat.router, prefix=settings.API_V1_STR)
app.include_router(stats.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "company": "Everest Executive Limo LLC",
        "system": "Luxury Chauffeur & Booking Management API",
        "version": settings.VERSION,
        "status": "operational",
        "docs": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {"status": "healthy", "service": "everest-limo-api"}

