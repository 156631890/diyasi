from datetime import datetime, timedelta

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database import get_db
from models import Lead, OutreachEvent
from services.email_sender import send_email

router = APIRouter(prefix="/outreach", tags=["outreach"])


def create_email_copy(lead: Lead, stage: str) -> tuple[str, str]:
    if stage == "initial":
        subject = f"OEM/ODM support for {lead.brand_name}"
        body = (
            f"Hi {lead.brand_name} team,\n\n"
            "We are a seamless underwear and activewear factory with flexible MOQ and fast sampling.\n"
            "If useful, I can share catalog options and sample workflow this week.\n\n"
            "Best regards,\nBusiness Development"
        )
    else:
        subject = f"Follow up on manufacturing support ({stage})"
        body = (
            f"Hi {lead.brand_name} team,\n\n"
            "Following up in case your team is planning upcoming production.\n"
            "We can support private label, fast sampling, and stable lead time.\n\n"
            "Regards,\nBusiness Development"
        )
    return subject, body


@router.get("/events")
def list_events(db: Session = Depends(get_db)) -> list[dict]:
    events = db.query(OutreachEvent).order_by(OutreachEvent.created_at.desc()).all()
    return [
        {
            "lead_email": event.lead_email,
            "stage": event.stage,
            "scheduled_day": event.scheduled_day,
            "subject": event.subject,
            "status": event.status,
            "created_at": event.created_at.isoformat(),
        }
        for event in events
    ]


@router.post("/run")
def run_outreach(db: Session = Depends(get_db)) -> dict:
    leads = (
        db.query(Lead)
        .filter(Lead.score >= 70)
        .filter(Lead.status.in_(["new", "contacted"]))
        .all()
    )

    created = 0
    skipped = 0
    for lead in leads:
        stages = [("initial", 0), ("followup_day_3", 3), ("followup_day_7", 7), ("followup_day_14", 14)]
        for stage, day in stages:
            exists = (
                db.query(OutreachEvent)
                .filter(OutreachEvent.lead_email == lead.email, OutreachEvent.stage == stage)
                .first()
            )
            if exists:
                skipped += 1
                continue
            subject, body = create_email_copy(lead, stage)
            event = OutreachEvent(
                lead_email=lead.email,
                stage=stage,
                scheduled_day=day,
                subject=subject,
                body=body,
                status="queued",
            )
            db.add(event)
            created += 1
        lead.status = "contacted"

    db.commit()
    return {"qualified_leads": len(leads), "scheduled_emails": created, "skipped_existing": skipped}


@router.post("/dispatch-due")
def dispatch_due(db: Session = Depends(get_db)) -> dict:
    now = datetime.utcnow()
    queued_events = db.query(OutreachEvent).filter(OutreachEvent.status == "queued").all()

    sent = 0
    failed = 0
    pending = 0
    for event in queued_events:
        due_at = event.created_at + timedelta(days=event.scheduled_day)
        if due_at > now:
            pending += 1
            continue

        ok, message = send_email(event.lead_email, event.subject, event.body)
        if ok:
            event.status = "sent"
            sent += 1
        else:
            event.status = f"failed:{message[:80]}"
            failed += 1

    db.commit()
    return {"sent": sent, "failed": failed, "pending_not_due": pending}
