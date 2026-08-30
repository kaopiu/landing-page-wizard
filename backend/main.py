import json
import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from database import get_connection, init_db, row_to_full, row_to_summary
from schemas import (
    SubmissionCreate,
    SubmissionCreated,
    SubmissionFull,
    SubmissionStatusUpdate,
    SubmissionSummary,
)

app = FastAPI(title="Landing Page Intake API")

origins = [o.strip() for o in os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.post("/api/submissions", response_model=SubmissionCreated, status_code=201)
def create_submission(payload: SubmissionCreate) -> SubmissionCreated:
    conn = get_connection()
    cursor = conn.execute(
        "INSERT INTO submissions (client_name, client_email, site_config, status) VALUES (?, ?, ?, ?)",
        (
            payload.client_name,
            payload.client_email,
            json.dumps(payload.site_config.model_dump()),
            "submitted",
        ),
    )
    conn.commit()
    submission_id = cursor.lastrowid
    conn.close()
    return SubmissionCreated(id=submission_id, status="submitted")


# TODO: add auth before this admin API is exposed outside localhost.
@app.get("/api/submissions", response_model=list[SubmissionSummary])
def list_submissions() -> list[SubmissionSummary]:
    conn = get_connection()
    rows = conn.execute("SELECT * FROM submissions ORDER BY id DESC").fetchall()
    conn.close()
    return [SubmissionSummary(**row_to_summary(r)) for r in rows]


@app.get("/api/submissions/{submission_id}", response_model=SubmissionFull)
def get_submission(submission_id: int) -> SubmissionFull:
    conn = get_connection()
    row = conn.execute("SELECT * FROM submissions WHERE id = ?", (submission_id,)).fetchone()
    conn.close()
    if row is None:
        raise HTTPException(status_code=404, detail="Submission not found")
    return SubmissionFull(**row_to_full(row))


@app.patch("/api/submissions/{submission_id}", response_model=SubmissionFull)
def update_submission_status(submission_id: int, payload: SubmissionStatusUpdate) -> SubmissionFull:
    conn = get_connection()
    row = conn.execute("SELECT * FROM submissions WHERE id = ?", (submission_id,)).fetchone()
    if row is None:
        conn.close()
        raise HTTPException(status_code=404, detail="Submission not found")
    conn.execute("UPDATE submissions SET status = ? WHERE id = ?", (payload.status, submission_id))
    conn.commit()
    row = conn.execute("SELECT * FROM submissions WHERE id = ?", (submission_id,)).fetchone()
    conn.close()
    return SubmissionFull(**row_to_full(row))
