function add() {
    let input = document.getElementById('todo-input');
    let list = document.getElementById('todo-list');
    if (input === '') {
        alert('Please enter a task');
    }
    else {
        list.innerHTML += `<li>${input.value} <span><button onclick="remove(this)">🗑</button> <button onclick="edit(this)">✏️</button> </span></li>`;
    }
    input.value = ''
}

function remove(event) {
    let listItem = event.parentNode.parentNode;
    listItem.remove();
}

function edit(event) {
    let newTask = prompt('Enter the updated task');
    let listItem = event.parentNode.parentNode;
    listItem.firstChild.textContent = newTask;
}