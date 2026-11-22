const form = document.getElementById("note-form");
const titleInput = document.getElementById("note-title");
const contentInput = document.getElementById("note-content");
const notesList = document.getElementById("notes-list");
const emptyState = document.getElementById("empty-state");
const countBadge = document.getElementById("note-count");
const charCount = document.getElementById("char-count");
const saveButton = document.getElementById("save-button");
const toast = document.getElementById("toast");
let editingId = null;

contentInput.addEventListener("input", () => {
  charCount.textContent = `${contentInput.value.length} characters`;
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2500);
}

function formatDate(dateString) {
  const date = new Date(dateString.replace(" ", "T") + "Z");
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
}

async function loadNotes() {
  try {
    const response = await fetch("/api/notes");
    const notes = await response.json();
    notesList.innerHTML = "";
    countBadge.textContent = notes.length;
    emptyState.style.display = notes.length ? "none" : "block";

    notes.forEach(note => {
      const card = document.createElement("article");
      card.className = "note-card";

      const top = document.createElement("div");
      top.className = "note-card-top";

      const info = document.createElement("div");
      const heading = document.createElement("h3");
      heading.textContent = note.title;
      const date = document.createElement("div");
      date.className = "note-date";
      date.textContent = formatDate(note.updated_at);
      info.append(heading, date);

      const actions = document.createElement("div");
      actions.className = "note-actions";

      const editButton = document.createElement("button");
      editButton.title = "Edit note";
      editButton.textContent = "✎";
      editButton.addEventListener("click", () => editNote(note));

      const deleteButton = document.createElement("button");
      deleteButton.title = "Delete note";
      deleteButton.className = "delete";
      deleteButton.textContent = "×";
      deleteButton.addEventListener("click", () => deleteNote(note.id));

      actions.append(editButton, deleteButton);
      top.append(info, actions);

      const content = document.createElement("p");
      content.className = "note-content";
      content.textContent = note.content;

      card.append(top, content);
      notesList.appendChild(card);
    });
  } catch (error) {
    showToast("Unable to load notes. Is the server running?");
  }
}

form.addEventListener("submit", async event => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();

  if (!content) {
    showToast("Please write something before saving.");
    contentInput.focus();
    return;
  }

  saveButton.disabled = true;
  saveButton.textContent = "Saving...";

  try {
    const url = editingId ? `/api/notes/${editingId}` : "/api/notes";
    const method = editingId ? "PUT" : "POST";
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content })
    });
    const result = await response.json();

    if (!response.ok) throw new Error(result.error || "Something went wrong.");

    form.reset();
    charCount.textContent = "0 characters";
    editingId = null;
    saveButton.innerHTML = "<span>＋</span> Save note";
    showToast(method === "POST" ? "Note saved successfully!" : "Note updated!");
    await loadNotes();
  } catch (error) {
    showToast(error.message);
  } finally {
    saveButton.disabled = false;
  }
});

function editNote(note) {
  editingId = note.id;
  titleInput.value = note.title;
  contentInput.value = note.content;
  charCount.textContent = `${note.content.length} characters`;
  saveButton.innerHTML = "✓ Update note";
  contentInput.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

async function deleteNote(id) {
  if (!confirm("Are you sure you want to delete this note?")) return;
  try {
    const response = await fetch(`/api/notes/${id}`, { method: "DELETE" });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Unable to delete note.");
    showToast("Note deleted.");
    if (editingId === id) {
      form.reset();
      editingId = null;
      saveButton.innerHTML = "<span>＋</span> Save note";
      charCount.textContent = "0 characters";
    }
    await loadNotes();
  } catch (error) {
    showToast(error.message);
  }
}

document.getElementById("refresh-button").addEventListener("click", loadNotes);
loadNotes();
