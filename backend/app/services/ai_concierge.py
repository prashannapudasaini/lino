import os
import logging
from typing import List, Dict, Any
from ..core.config import settings

logger = logging.getLogger("everest_limo.ai")

SYSTEM_KNOWLEDGE = """
You are the AI Concierge for Everest Executive Limo LLC, a premier luxury chauffeur and executive transportation company based in Pennsylvania, serving PA, NJ, NY, and Washington D.C.

TONE & MANNER:
- Sophisticated, polite, discreet, warm, professional, executive-level luxury concierge tone.
- Concise, clear, helpful answers.

VERIFIED BUSINESS INFORMATION:
- Company Name: Everest Executive Limo LLC
- Primary Service Hub: Harrisburg, Pennsylvania
- Service Coverage: Central PA (Harrisburg, Hershey, Lancaster, York, Mechanicsburg, Carlisle), Greater Philadelphia, New Jersey, New York City (Manhattan, Queens, Brooklyn), and Washington D.C.
- Confirmed Airports Serviced:
  * MDT — Harrisburg International Airport
  * PHL — Philadelphia International Airport
  * JFK — John F. Kennedy International Airport
  * LGA — LaGuardia Airport
  * EWR — Newark Liberty International Airport
- Core Services:
  1. Airport Transportation: Curbside & meet-and-greet transfers, luggage assistance, flight monitoring upon booking.
  2. Corporate & Executive Travel: Executive roadshows, point-to-point business transfers, confidential executive travel.
  3. Private Hourly Chauffeur: As-directed hourly service for business leaders, VIP guests, and dining.
  4. Special Events Transportation: Weddings, galas, red carpet events, and private occasions.
- Fleet Highlights:
  * Executive Sedans: Mercedes-Benz S-Class / Cadillac CT6 (up to 3 passengers, 3 bags)
  * Luxury SUVs: Cadillac Escalade ESV / Lincoln Navigator L (up to 6 passengers, 6 bags)
  * Executive Sprinters: Mercedes-Benz Sprinter Executive Jet Class (up to 14 passengers, 12 bags)
  * Stretch Limousines: Executive Stretch (up to 8-10 passengers, 6 bags)
- How Booking Works:
  Clients submit an online quote request via our website or call our dispatch. Our operations team reviews journey requirements and provides a customized, all-inclusive quote. Once confirmed with our team, the luxury chauffeur is reserved.
- Strict Constraints:
  * NEVER invent exact dollar pricing or guarantee vehicle availability instantly.
  * Explain that quotes depend on distance, vehicle category, and itinerary details.
  * Guide users to use the 'Request a Quote' button or page (/quote) for an exact estimate, or call +1 (717) 555-0199.
  * Never claim live GPS tracking or automated driver dispatch is currently active for enquiries.
"""

def get_concierge_response(message: str, history: List[Dict[str, str]] = None) -> Dict[str, Any]:
    """
    Generates an executive concierge response using Gemini if API key is provided,
    otherwise uses high-precision contextual intent matching based on verified business knowledge.
    """
    api_key = settings.GEMINI_API_KEY or os.environ.get("GEMINI_API_KEY", "")

    if api_key:
        try:
            from google import genai
            from google.genai import types

            client = genai.Client(api_key=api_key)
            
            # Format prompt with system context
            contents = [SYSTEM_KNOWLEDGE]
            if history:
                for h in history[-4:]:
                    role = "User" if h.get("role") == "user" else "Model"
                    contents.append(f"{role}: {h.get('content')}")
            contents.append(f"User: {message}\nConcierge:")

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents="\n\n".join(contents),
                config=types.GenerateContentConfig(
                    temperature=0.3,
                    max_output_tokens=350,
                )
            )
            if response and response.text:
                return {
                    "reply": response.text.strip(),
                    "suggested_actions": ["Request a Quote", "Explore Our Fleet", "Airport Service Details"],
                    "action_url": "/quote"
                }
        except Exception as e:
            logger.warning(f"Gemini API call skipped or encountered error: {e}. Falling back to rule-based concierge.")

    # High-quality fallback concierge engine
    msg = message.lower().strip()
    
    if any(k in msg for k in ["quote", "book", "reserve", "cost", "price", "rate", "how much", "fare"]):
        return {
            "reply": "Every journey with Everest Executive Limo is customized to your itinerary, vehicle preference, and service requirements. We provide transparent, personalized quotes after reviewing your details. Would you like to submit a complimentary quote request?",
            "suggested_actions": ["Request a Quote Now", "Call Dispatch", "View Fleet"],
            "action_url": "/quote"
        }
    
    if any(k in msg for k in ["airport", "flight", "mdt", "phl", "jfk", "lga", "ewr", "terminal", "harrisburg airport", "newark", "philadelphia"]):
        return {
            "reply": "We specialize in executive airport transfers servicing Harrisburg International (MDT), Philadelphia International (PHL), Newark Liberty (EWR), JFK, and LaGuardia (LGA). We offer terminal meet-and-greet, luggage handling, and executive drop-offs.",
            "suggested_actions": ["Airport Transportation Page", "Get Airport Quote", "View Fleet"],
            "action_url": "/airport-transportation"
        }

    if any(k in msg for k in ["fleet", "car", "suv", "sedan", "sprinter", "limo", "vehicle", "escalade", "mercedes"]):
        return {
            "reply": "Our meticulously maintained fleet features Executive Sedans (Mercedes-Benz S-Class / Cadillac CT6 for up to 3 passengers), Luxury SUVs (Cadillac Escalade ESV for up to 6 passengers), Executive Sprinters (up to 14 passengers), and Stretch Limousines.",
            "suggested_actions": ["Explore Our Fleet", "Request a Quote", "Contact Team"],
            "action_url": "/fleet"
        }

    if any(k in msg for k in ["area", "city", "where", "location", "coverage", "pennsylvania", "new york", "new jersey", "dc", "washington"]):
        return {
            "reply": "Everest Executive Limo proudly provides premium chauffeur transportation throughout Pennsylvania (including Harrisburg, Hershey, Lancaster, York, and Philadelphia), New Jersey, New York City, and Washington D.C.",
            "suggested_actions": ["View Service Areas", "Request a Quote", "Call Us"],
            "action_url": "/service-areas"
        }

    if any(k in msg for k in ["phone", "call", "email", "contact", "speak", "number", "human"]):
        return {
            "reply": "You can reach our executive dispatch and client concierge team at +1 (717) 555-0199 or via email at reservations@everestlimo.com. We are dedicated to providing responsive, personalized assistance.",
            "suggested_actions": ["Contact Us Page", "Call +1 (717) 555-0199", "Request a Quote"],
            "action_url": "/contact"
        }

    return {
        "reply": "Welcome to Everest Executive Limo LLC. We offer executive chauffeur transportation, airport transfers, corporate travel, and hourly private driver services across PA, NJ, NY, and Washington D.C. How may I assist with your travel arrangements today?",
        "suggested_actions": ["Request a Quote", "Explore Fleet", "Airport Service", "Contact Dispatch"],
        "action_url": "/quote"
    }
