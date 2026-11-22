# QuickNote Application

A single-page note application built with Flask, SQLite, HTML, CSS and JavaScript.

## Features
- Create and save notes
- View saved notes
- Edit notes
- Delete notes
- SQLite database storage
- REST API endpoints
- Responsive UI

## Requirements
- Python 3.8+
- pip

## Setup

1. Extract the project folder.
2. Open a terminal inside the project folder.
3. Create a virtual environment (recommended):

   Windows:
   ```bash
   python -m venv venv
   venv\Scripts\activate
   ```

   macOS/Linux:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Run:
   ```bash
   python app.py
   ```

6. Open the URL printed in the terminal, usually:
   http://127.0.0.1:5000

The SQLite database (`notes.db`) is created automatically when the application starts.

## API

- `GET /api/notes` — get all notes
- `POST /api/notes` — create a note
- `PUT /api/notes/<id>` — update a note
- `DELETE /api/notes/<id>` — delete a note

Example POST body:
```json
{
  "title": "Shopping list",
  "content": "Milk, bread, eggs"
}
```
