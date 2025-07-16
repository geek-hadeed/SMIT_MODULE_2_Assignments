import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCKzOCgzgQxs-uOdjD1RwYeEetH0gazbqY",
  authDomain: "todo-app-hh.firebaseapp.com",
  projectId: "todo-app-hh",
  storageBucket: "todo-app-hh.firebasestorage.app",
  messagingSenderId: "25739824065",
  appId: "1:25739824065:web:e5f21b62f234f44beafd40",
  measurementId: "G-HMQ2LG95E1"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // ✅ only declare once

const taskList = document.getElementById('task-list');
const addBtn = document.getElementById('add-btn');
const newTaskInput = document.getElementById('new-task');
const clearCompletedBtn = document.getElementById('clear-completed');

let lastChecked;
const tasksRef = collection(db, "tasks");

// Fetch tasks from Firestore
window.onload = async () => {
  const snapshot = await getDocs(tasksRef);
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    addTask(docSnap.id, data.text, data.checked);
  });
};

async function saveTaskToFirebase(id, updatedText, checked) {
  await updateDoc(doc(db, "tasks", id), {
    text: updatedText,
    checked: checked
  });
}

async function addTaskToFirebase(text) {
  const docRef = await addDoc(tasksRef, { text, checked: false });
  return docRef.id;
}

async function deleteTaskFromFirebase(id) {
  await deleteDoc(doc(db, "tasks", id));
}

function addTask(id, text, checked = false) {
  const label = document.createElement('label');
  label.className = 'item';
  label.dataset.id = id;
  label.innerHTML = `
    <input type="checkbox" class="checkbox" ${checked ? 'checked' : ''} />
    <span class="custom-checkbox"></span>
    <span class="text">${text}</span>
    <input type="text" class="edit-input" value="${text}" style="display:none" />
    <button class="edit-btn">Edit</button>
  `;

  taskList.appendChild(label);

  const checkbox = label.querySelector('.checkbox');
  const editBtn = label.querySelector('.edit-btn');
  const editInput = label.querySelector('.edit-input');
  const textSpan = label.querySelector('.text');

  checkbox.addEventListener('change', async (e) => {
    updateTextStyle(checkbox);
    await saveTaskToFirebase(label.dataset.id, textSpan.textContent, checkbox.checked);
  });
  updateTextStyle(checkbox);

  editBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const isEditing = label.classList.contains('editing');
    if (!isEditing) {
      label.classList.add('editing');
      editInput.style.display = 'block';
      editInput.focus();
    } else {
      label.classList.remove('editing');
      textSpan.textContent = editInput.value;
      editInput.style.display = 'none';
      await saveTaskToFirebase(label.dataset.id, editInput.value, checkbox.checked);
    }
  });
}

function updateTextStyle(checkbox) {
  const text = checkbox.nextElementSibling.nextElementSibling;
  if (checkbox.checked) {
    text.classList.add('line-through');
  } else {
    text.classList.remove('line-through');
  }
}

addBtn.addEventListener('click', async () => {
  const text = newTaskInput.value.trim();
  if (!text) return;
  const id = await addTaskToFirebase(text);
  addTask(id, text);
  newTaskInput.value = '';
});

clearCompletedBtn.addEventListener('click', async () => {
  const checkboxes = document.querySelectorAll('.checkbox:checked');
  for (const checkbox of checkboxes) {
    const item = checkbox.closest('.item');
    await deleteTaskFromFirebase(item.dataset.id);
    item.remove();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Shift') {
    document.body.style.cursor = 'pointer';
    document.querySelectorAll('.item').forEach(item => item.classList.add('shift-active'));
  }
});

document.addEventListener('keyup', e => {
  if (e.key === 'Shift') {
    document.body.style.cursor = '';
    document.querySelectorAll('.item').forEach(item => item.classList.remove('shift-active'));
  }
});
