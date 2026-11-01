import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

logger = logging.getLogger("everest_limo.email")

def send_booking_acknowledgement_email(booking_data: dict) -> bool:
    """
    Sends customer an acknowledgment email with their reference code and journey summary.
    Clearly notes that this is an enquiry under review, NOT an instant confirmed reservation.
    """
    reference = booking_data.get("reference_code", "EEL-PENDING")
    customer_name = booking_data.get("full_name", "Valued Client")
    customer_email = booking_data.get("email")
    pickup = booking_data.get("pickup_location", "TBD")
    dropoff = booking_data.get("dropoff_location", "TBD")
    date = booking_data.get("pickup_date", "")
    time = booking_data.get("pickup_time", "")
    service = booking_data.get("service_type", "Chauffeur Service")
    vehicle = booking_data.get("vehicle_preference") or "Executive Class"
    passengers = booking_data.get("passengers", 1)
    luggage = booking_data.get("luggage", 1)
    airport_code = booking_data.get("airport_code")
    flight_num = booking_data.get("flight_number")

    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Request Received — Everest Executive Limo LLC</title>
      <style>
        body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b0c; color: #f5f3ef; margin: 0; padding: 20px; }}
        .container {{ max-width: 600px; margin: 0 auto; background: #151517; border: 1px solid #2a2a2e; border-radius: 8px; overflow: hidden; }}
        .header {{ background: #0b0b0c; padding: 32px 24px; text-align: center; border-bottom: 1px solid #c5a46d33; }}
        .brand {{ color: #c5a46d; font-size: 22px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin: 0; }}
        .tagline {{ color: #a7a5a0; font-size: 12px; letter-spacing: 1px; margin-top: 6px; text-transform: uppercase; }}
        .body {{ padding: 32px 24px; }}
        .badge {{ display: inline-block; background: #262118; color: #c5a46d; border: 1px solid #c5a46d66; padding: 6px 14px; border-radius: 4px; font-size: 13px; font-weight: 600; letter-spacing: 1px; margin-bottom: 20px; }}
        h1 {{ font-size: 20px; color: #ffffff; margin-top: 0; margin-bottom: 12px; }}
        p {{ color: #a7a5a0; line-height: 1.6; font-size: 14px; margin-top: 0; margin-bottom: 16px; }}
        .highlight-notice {{ background: #1d1d20; border-left: 3px solid #c5a46d; padding: 14px 18px; margin: 24px 0; border-radius: 0 4px 4px 0; }}
        .highlight-notice p {{ color: #e5e3df; margin: 0; font-size: 13.5px; line-height: 1.5; }}
        .table {{ width: 100%; border-collapse: collapse; margin: 24px 0; background: #101012; border-radius: 6px; overflow: hidden; }}
        .table td {{ padding: 12px 16px; font-size: 13.5px; border-bottom: 1px solid #202024; }}
        .table td.label {{ color: #8e8c87; width: 38%; font-weight: 500; }}
        .table td.value {{ color: #f5f3ef; font-weight: 600; }}
        .footer {{ background: #0b0b0c; padding: 24px; text-align: center; font-size: 12px; color: #686868; border-top: 1px solid #1f1f23; }}
        .footer a {{ color: #c5a46d; text-decoration: none; }}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="brand">Everest Executive Limo</div>
          <div class="tagline">Premium Chauffeur & Executive Travel</div>
        </div>
        <div class="body">
          <div class="badge">REFERENCE: {reference}</div>
          <h1>Ride Request Received</h1>
          <p>Dear {customer_name},</p>
          <p>Thank you for choosing Everest Executive Limo LLC. We have successfully received your luxury transportation enquiry.</p>
          
          <div class="highlight-notice">
            <p><strong>Important Notice:</strong> This email confirms receipt of your quote request. Your reservation is currently under review by our executive dispatch team. A personalized quote and official confirmation will be provided shortly.</p>
          </div>

          <table class="table">
            <tr><td class="label">Reference ID</td><td class="value">{reference}</td></tr>
            <tr><td class="label">Service Type</td><td class="value">{service}</td></tr>
            <tr><td class="label">Pickup Location</td><td class="value">{pickup}</td></tr>
            <tr><td class="label">Destination</td><td class="value">{dropoff}</td></tr>
            <tr><td class="label">Date & Time</td><td class="value">{date} at {time}</td></tr>
            <tr><td class="label">Vehicle Class</td><td class="value">{vehicle}</td></tr>
            <tr><td class="label">Passengers / Luggage</td><td class="value">{passengers} Passengers / {luggage} Bags</td></tr>
            {f'<tr><td class="label">Airport / Flight</td><td class="value">{airport_code} {flight_num or ""}</td></tr>' if airport_code else ''}
          </table>

          <p>If you have any urgent schedule adjustments or special concierge requirements, please contact our team directly at <a href="tel:+17175550199" style="color: #c5a46d; text-decoration: none;">+1 (717) 555-0199</a> or reply to this message.</p>
        </div>
        <div class="footer">
          &copy; 2026 Everest Executive Limo LLC. All rights reserved.<br>
          Serving Pennsylvania, New York, New Jersey, and Washington D.C.<br>
          <a href="mailto:reservations@everestlimo.com">reservations@everestlimo.com</a>
        </div>
      </div>
    </body>
    </html>
    """

    # If real SMTP is configured via env, send it; otherwise log the simulated send
    smtp_host = os.getenv("SMTP_HOST")
    if smtp_host:
        try:
            smtp_port = int(os.getenv("SMTP_PORT", "587"))
            smtp_user = os.getenv("SMTP_USER", "")
            smtp_pass = os.getenv("SMTP_PASS", "")
            
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"Booking Request Received — Reference {reference} | Everest Executive Limo"
            msg["From"] = f"Everest Executive Limo <{os.getenv('SMTP_FROM', 'reservations@everestlimo.com')}>"
            msg["To"] = customer_email
            msg.attach(MIMEText(html_content, "html"))
            
            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                server.starttls()
                if smtp_user and smtp_pass:
                    server.login(smtp_user, smtp_pass)
                server.sendmail(msg["From"], [customer_email], msg.as_string())
            logger.info(f"Sent customer acknowledgment email to {customer_email} for reference {reference}")
            return True
        except Exception as e:
            logger.error(f"Error sending customer SMTP email: {e}")
            return False
    else:
        logger.info(f"[SIMULATED EMAIL DISPATCH] Customer acknowledgment generated for {customer_email} (Ref: {reference})")
        return True

def send_business_notification_email(booking_data: dict) -> bool:
    """
    Notifies dispatch/management about a new booking enquiry.
    """
    reference = booking_data.get("reference_code", "EEL-PENDING")
    customer_name = booking_data.get("full_name")
    customer_email = booking_data.get("email")
    customer_phone = booking_data.get("phone")
    pickup = booking_data.get("pickup_location")
    dropoff = booking_data.get("dropoff_location")
    date = booking_data.get("pickup_date")
    time = booking_data.get("pickup_time")
    service = booking_data.get("service_type")
    
    logger.info(f"[DISPATCH NOTIFICATION] New enquiry {reference} by {customer_name} ({customer_email}, {customer_phone}) from {pickup} to {dropoff} on {date} at {time} [{service}]")
    return True

