# 📝 QuickNote — Full Stack Note-Taking Application

A simple, responsive, and user-friendly note-taking application built with **Python Flask, SQLite, HTML, CSS, and JavaScript**.

QuickNote allows users to create, save, view, edit, and delete notes through an intuitive web interface. The application demonstrates how a frontend communicates with a Python backend, how REST API endpoints handle requests, and how data is stored and retrieved from a database.

---

## 📌 Project Overview

QuickNote is a single-page web application designed to provide users with a convenient way to capture and organize their thoughts, reminders, ideas, and important information.

The application follows a client-server architecture. Users interact with the frontend interface, which sends requests to the Flask backend. The backend processes these requests and interacts with an SQLite database to store, retrieve, update, or delete notes.

The saved notes are displayed dynamically on the same page without requiring a complete page reload.

### 🎯 Project Objectives

- Develop a functional single-page note-taking application.
- Implement frontend-backend communication.
- Understand the request-response cycle.
- Create and integrate REST API endpoints.
- Perform basic database operations.
- Store application data persistently using SQLite.
- Build a responsive and user-friendly interface.
- Implement CRUD operations for managing notes.

---

## ✨ Features

### 1. Create Notes
Users can create new notes by entering a title and note content. The title is optional, and the application automatically generates a title when one is not provided.

### 2. Save Notes
Notes are submitted to the Python backend through HTTP requests and stored in the SQLite database.

### 3. View Saved Notes
All saved notes are displayed dynamically on the application interface, including their titles, content, and timestamps.

### 4. Edit Notes
Users can modify previously saved notes. The selected note's content is loaded into the editor, allowing changes to be made and saved.

### 5. Delete Notes
Users can remove unwanted notes from the application. A confirmation dialog is displayed before deletion.

### 6. Dynamic User Interface
The application updates the saved notes section dynamically using JavaScript and the Fetch API without refreshing the entire webpage.

### 7. Responsive Design
The interface adapts to different screen sizes, making it usable on desktop computers, tablets, and mobile devices.

### 8. Input Validation
The application prevents empty notes from being submitted and provides feedback when required input is missing.

### 9. Notifications
The application displays notifications to inform users about successful actions and errors.

### 10. Persistent Data Storage
Notes are stored in an SQLite database, allowing saved data to remain available after restarting the application.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Python | Backend programming language |
| Flask | Web framework and API development |
| SQLite | Database for persistent note storage |
| HTML5 | Application structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Dynamic functionality and frontend interaction |
| Fetch API | Communication between frontend and backend |
| JSON | Data exchange between frontend and backend |

---

## 🏗️ Application Architecture

QuickNote follows a client-server architecture.

### Frontend
The frontend is responsible for displaying the user interface and collecting user input.

Technologies used:
- HTML
- CSS
- JavaScript

### Backend
The backend receives requests from the frontend, validates the data, performs database operations, and returns responses.

Technology used:
- Python
- Flask

### Database
The database stores note information persistently.

Technology used:
- SQLite

### Architecture Flow

```text
┌──────────────────────────────┐
│          USER               │
│                              │
│  Create / Edit / Delete      │
│          Notes               │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         FRONTEND             │
│                              │
│ HTML + CSS + JavaScript      │
│                              │
│       Fetch API              │
└──────────────┬───────────────┘
               │ HTTP Requests
               ▼
┌──────────────────────────────┐
│         BACKEND              │
│                              │
│       Python Flask           │
│                              │
│ API Routes & Validation      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         DATABASE             │
│                              │
│          SQLite              │
│                              │
│       notes.db               │
└──────────────────────────────┘
```

---

## 🔄 Application Workflow

### Creating a Note

1. The user enters a title and note content.
2. The user clicks the **Save Note** button.
3. JavaScript captures the entered data.
4. The frontend sends an HTTP POST request to the Flask backend.
5. Flask receives and validates the request.
6. The backend inserts the note into the SQLite database.
7. The backend returns the saved note as JSON.
8. JavaScript updates the interface.
9. The newly saved note appears in the Saved Notes section.

### Viewing Notes

1. The webpage loads.
2. JavaScript sends a GET request to the backend.
3. Flask retrieves all notes from SQLite.
4. The notes are returned in JSON format.
5. JavaScript dynamically displays the notes.

### Updating a Note

1. The user clicks the edit icon on a saved note.
2. The selected note's title and content are loaded into the editor.
3. The user modifies the note.
4. The user clicks the Update Note button.
5. JavaScript sends a PUT request to the backend.
6. Flask updates the corresponding database record.
7. The updated note is displayed.

### Deleting a Note

1. The user clicks the delete icon.
2. A confirmation dialog appears.
3. After confirmation, JavaScript sends a DELETE request.
4. Flask removes the corresponding record from SQLite.
5. The frontend refreshes the saved notes list.

---

## 📂 Project Structure

```text
QuickNote_Application/
│
├── app.py
│
├── notes.db
│
├── requirements.txt
│
├── README.md
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js
```

### File Descriptions

#### `app.py`
Contains the Flask backend application.

Responsibilities:
- Initialize the Flask application.
- Configure the SQLite database.
- Create the notes table.
- Define API endpoints.
- Handle HTTP requests.
- Validate note data.
- Perform database operations.
- Return JSON responses.

#### `templates/index.html`
Contains the main HTML structure of the application.

Responsibilities:
- Display the application header.
- Provide the note editor.
- Display saved notes.
- Include buttons for saving, editing, deleting, and refreshing notes.
- Connect CSS and JavaScript files.

#### `static/style.css`
Contains the styling for the application.

Responsibilities:
- Define colors and typography.
- Style the editor and saved notes.
- Create the responsive layout.
- Style buttons, cards, notifications, and interactive elements.
- Adapt the interface to different screen sizes.

#### `static/script.js`
Contains frontend functionality.

Responsibilities:
- Handle form submissions.
- Communicate with the Flask API.
- Fetch saved notes.
- Display notes dynamically.
- Handle editing and deleting.
- Update the character counter.
- Display notifications.
- Manage application state.

#### `requirements.txt`
Contains the Python dependencies required to run the application.

#### `notes.db`
SQLite database file created automatically when the application runs.

---

## 🗄️ Database Design

QuickNote uses SQLite for persistent storage.

### Database Name

```text
notes.db
```

### Table Name

```text
notes
```

### Table Structure

| Column | Data Type | Description |
|---|---|---|
| id | INTEGER | Unique identifier for each note |
| title | TEXT | Title of the note |
| content | TEXT | Main content of the note |
| created_at | TIMESTAMP | Date and time when the note was created |
| updated_at | TIMESTAMP | Date and time when the note was last updated |

### SQL Table Creation

```sql
CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Database Operations

The application performs the following database operations:

- **INSERT** – Create a new note.
- **SELECT** – Retrieve saved notes.
- **UPDATE** – Modify an existing note.
- **DELETE** – Remove a note.

---

## 🔌 API Documentation

The backend provides REST API endpoints for managing notes.

### Base URL

```text
http://127.0.0.1:5000
```

### 1. Get All Notes

**Endpoint:**

```http
GET /api/notes
```

**Description:**

Retrieves all saved notes from the database.

**Example Response:**

```json
[
    {
        "id": 1,
        "title": "Shopping List",
        "content": "Milk, bread, and eggs",
        "created_at": "2026-11-22 10:00:00",
        "updated_at": "2026-11-22 10:00:00"
    }
]
```

---

### 2. Create a Note

**Endpoint:**

```http
POST /api/notes
```

**Description:**

Creates and saves a new note.

**Request Content-Type:**

```text
application/json
```

**Example Request:**

```json
{
    "title": "Shopping List",
    "content": "Milk, bread, and eggs"
}
```

**Example Response:**

```json
{
    "id": 1,
    "title": "Shopping List",
    "content": "Milk, bread, and eggs",
    "created_at": "2026-11-22 10:00:00",
    "updated_at": "2026-11-22 10:00:00"
}
```

**Status Code:**

```http
201 Created
```

---

### 3. Update a Note

**Endpoint:**

```http
PUT /api/notes/<note_id>
```

**Description:**

Updates the title and content of an existing note.

**Example Request:**

```json
{
    "title": "Updated Shopping List",
    "content": "Milk, bread, eggs, and fruits"
}
```

**Example Response:**

```json
{
    "id": 1,
    "title": "Updated Shopping List",
    "content": "Milk, bread, eggs, and fruits",
    "created_at": "2026-11-22 10:00:00",
    "updated_at": "2026-11-22 10:30:00"
}
```

---

### 4. Delete a Note

**Endpoint:**

```http
DELETE /api/notes/<note_id>
```

**Description:**

Deletes a note from the database using its unique identifier.

**Example Response:**

```json
{
    "message": "Note deleted successfully."
}
```

---

## 🚀 Installation and Setup

### Prerequisites

Before running the application, ensure that the following are installed:

- Python 3.8 or later
- pip
- Visual Studio Code or another code editor
- Web browser

### Step 1: Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/quick-note-application.git
```

### Step 2: Navigate to the Project Directory

```bash
cd quick-note-application
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

On Windows, if the `pip` command is not recognized, use:

```powershell
py -m pip install -r requirements.txt
```

### Step 4: Run the Application

```bash
python app.py
```

On Windows, if the `python` command is not recognized, use:

```powershell
py app.py
```

### Step 5: Open the Application

Open your web browser and navigate to:

```text
http://127.0.0.1:5000
```

The QuickNote application will be available locally.

---

## 💻 Usage Guide

### Creating a Note

1. Open the QuickNote application.
2. Enter a title in the title field (optional).
3. Enter your note content.
4. Click **Save Note**.
5. Your note will appear in the Saved Notes section.

### Editing a Note

1. Locate the note you want to modify.
2. Click the edit icon.
3. Modify the title or content.
4. Click **Update Note**.

### Deleting a Note

1. Locate the note you want to remove.
2. Click the delete icon.
3. Confirm the deletion.
4. The note will be removed from the application.

### Refreshing Notes

Click the refresh button in the Saved Notes section to reload notes from the database.

---

## 🧠 Concepts Demonstrated

This project demonstrates several important concepts in web development:

### Frontend Development
- HTML document structure
- CSS styling
- Responsive design
- JavaScript DOM manipulation
- Event handling
- Form validation

### Backend Development
- Python programming
- Flask application development
- Routing
- HTTP request handling
- JSON responses
- REST API development

### Database Management
- SQLite integration
- Database connection management
- SQL queries
- CRUD operations
- Persistent data storage

### Client-Server Communication
- HTTP methods
- Request-response flow
- Fetch API
- JSON data exchange
- Asynchronous JavaScript

---

## 🔐 Data Validation and Error Handling

The application includes basic validation and error handling.

- Empty note content is not accepted.
- Notes without titles receive automatically generated titles.
- Invalid note requests return appropriate error responses.
- Requests to update or delete nonexistent notes return a not-found response.
- User notifications provide feedback about successful and unsuccessful operations.

---

## 📱 User Interface

QuickNote features a clean and modern interface designed for simplicity and usability.

### UI Components

- Application header
- New Note editor
- Optional title input
- Note content textarea
- Character counter
- Save Note button
- Saved Notes section
- Note cards
- Edit and delete controls
- Refresh button
- Empty state
- Toast notifications

The design uses a clean layout, rounded cards, soft colors, and responsive spacing to create a comfortable note-taking experience.

---

## 🧪 Testing

The application was manually tested for the following functionalities:

| Test Case | Expected Result | Status |
|---|---|---|
| Open application | Homepage loads successfully | Passed |
| Create note | Note is saved | Passed |
| Display note | Note appears in Saved Notes | Passed |
| Edit note | Note content updates | Passed |
| Delete note | Note is removed | Passed |
| Empty submission | Validation message appears | Passed |
| Database persistence | Saved notes remain stored | Passed |

---

## ⚙️ Technical Implementation

### Backend Framework

Flask is used to create the web application and API endpoints.

### Database Connectivity

The application uses Python's built-in `sqlite3` module to connect to and interact with the SQLite database.

### Frontend Communication

The JavaScript Fetch API is used to send HTTP requests to the Flask backend.

### Data Format

JSON is used to transfer data between the frontend and backend.

### Application Initialization

The SQLite database and notes table are initialized automatically when the application starts.

---

## 📈 Future Enhancements

The following features could be implemented in future versions:

- User authentication and registration
- Multiple user accounts
- Search functionality
- Note categories and tags
- Pin important notes
- Rich text editing
- Dark mode
- Export notes as PDF or text
- Cloud database integration
- Deploy the application online
- Pagination for large collections of notes
- Improved security and production deployment configuration

---

## ⚠️ Limitations

- The application currently runs locally.
- It does not include user authentication.
- Notes are stored in a local SQLite database.
- The development server is intended for development and testing.
- The application does not currently support cloud synchronization across devices.

---

## 🎓 Internship Project

This project was developed as part of a Full Stack Development Internship task.

**Task:** Quick Note Application

**Objective:** Build a single-page application where users can write and save notes, send them to a Python backend, store them in a database, and display them on the same page.

The project helped demonstrate practical understanding of frontend development, backend programming, API integration, and database management.

---

## 👩‍💻 Author

**Arshiya Thaslim K**

Full Stack Development Intern

---

## 📄 License

This project was created for educational and internship purposes.

No specific open-source license has been assigned to this repository.

---

## ⭐ Acknowledgements

Developed as a learning project to explore full-stack web development, Flask backend integration, REST APIs, and database operations.

---

