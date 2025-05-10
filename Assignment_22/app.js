const taskList = document.getElementById('task-list');
const addBtn = document.getElementById('add-btn');
const newTaskInput = document.getElementById('new-task');
const clearCompletedBtn = document.getElementById('clear-completed');

let lastChecked;

// Load tasks from localStorage
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => addTask(task.text, task.checked));
};

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.item').forEach(item => {
    const checkbox = item.querySelector('.checkbox');
    const text = item.querySelector('.text').textContent;
    tasks.push({ text, checked: checkbox.checked });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(text, checked = false) {
  const label = document.createElement('label');
  label.className = 'item';
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

  checkbox.addEventListener('change', handleCheck);
  updateTextStyle(checkbox);

  editBtn.addEventListener('click', (e) => {
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
      saveTasks();
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

function handleCheck(e) {
  const checkboxes = document.querySelectorAll('.checkbox');
  let inBetween = false;

  if (e.shiftKey && this.checked) {
    checkboxes.forEach(checkbox => {
      if (checkbox === this || checkbox === lastChecked) {
        inBetween = !inBetween;
      }
      if (inBetween) {
        checkbox.checked = true;
        updateTextStyle(checkbox);
        checkbox.closest('.item').classList.add('in-between');
        setTimeout(() => checkbox.closest('.item').classList.remove('in-between'), 500);
      }
    });
  }
  updateTextStyle(this);
  lastChecked = this;
  saveTasks();
}

addBtn.addEventListener('click', () => {
  const text = newTaskInput.value.trim();
  if (!text) return;
  addTask(text);
  newTaskInput.value = '';
  saveTasks();
});

clearCompletedBtn.addEventListener('click', () => {
  document.querySelectorAll('.checkbox:checked').forEach(checkbox => {
    checkbox.closest('.item').remove();
  });
  saveTasks();
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
