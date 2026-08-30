import json
import sqlite3
from pathlib import Path

DB_PATH = Path(__file__).parent / "submissions.db"


def get_connection() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db() -> None:
    conn = get_connection()
    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at TEXT NOT NULL DEFAULT (datetime('now')),
            client_name TEXT NOT NULL,
            client_email TEXT NOT NULL,
            site_config TEXT NOT NULL,
            status TEXT NOT NULL DEFAULT 'submitted'
        )
        """
    )
    conn.commit()
    conn.close()


def row_to_summary(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "created_at": row["created_at"],
        "client_name": row["client_name"],
        "client_email": row["client_email"],
        "status": row["status"],
    }


def row_to_full(row: sqlite3.Row) -> dict:
    return {
        "id": row["id"],
        "created_at": row["created_at"],
        "client_name": row["client_name"],
        "client_email": row["client_email"],
        "site_config": json.loads(row["site_config"]),
        "status": row["status"],
    }
