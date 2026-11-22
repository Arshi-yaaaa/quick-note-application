from flask import Flask, request, jsonify, render_template
import sqlite3
from pathlib import Path

app = Flask(__name__)
DB_PATH = Path(__file__).with_name("notes.db")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    with get_db() as conn:
        conn.execute("""
            CREATE TABLE IF NOT EXISTS notes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        conn.commit()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/notes", methods=["GET"])
def get_notes():
    with get_db() as conn:
        rows = conn.execute(
            "SELECT id, title, content, created_at, updated_at FROM notes ORDER BY updated_at DESC"
        ).fetchall()
    return jsonify([dict(row) for row in rows])

@app.route("/api/notes", methods=["POST"])
def create_note():
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    content = (data.get("content") or "").strip()

    if not content:
        return jsonify({"error": "Note content cannot be empty."}), 400

    if not title:
        title = content.splitlines()[0][:50] or "Untitled note"

    with get_db() as conn:
        cursor = conn.execute(
            "INSERT INTO notes (title, content) VALUES (?, ?)",
            (title, content)
        )
        conn.commit()
        note_id = cursor.lastrowid
        row = conn.execute(
            "SELECT id, title, content, created_at, updated_at FROM notes WHERE id = ?",
            (note_id,)
        ).fetchone()
    return jsonify(dict(row)), 201

@app.route("/api/notes/<int:note_id>", methods=["PUT"])
def update_note(note_id):
    data = request.get_json(silent=True) or {}
    title = (data.get("title") or "").strip()
    content = (data.get("content") or "").strip()

    if not content:
        return jsonify({"error": "Note content cannot be empty."}), 400

    if not title:
        title = content.splitlines()[0][:50] or "Untitled note"

    with get_db() as conn:
        cursor = conn.execute(
            """UPDATE notes
               SET title = ?, content = ?, updated_at = CURRENT_TIMESTAMP
               WHERE id = ?""",
            (title, content, note_id)
        )
        conn.commit()
        if cursor.rowcount == 0:
            return jsonify({"error": "Note not found."}), 404
        row = conn.execute(
            "SELECT id, title, content, created_at, updated_at FROM notes WHERE id = ?",
            (note_id,)
        ).fetchone()
    return jsonify(dict(row))

@app.route("/api/notes/<int:note_id>", methods=["DELETE"])
def delete_note(note_id):
    with get_db() as conn:
        cursor = conn.execute("DELETE FROM notes WHERE id = ?", (note_id,))
        conn.commit()
    if cursor.rowcount == 0:
        return jsonify({"error": "Note not found."}), 404
    return jsonify({"message": "Note deleted successfully."})

if __name__ == "__main__":
    init_db()
    app.run(debug=True)
