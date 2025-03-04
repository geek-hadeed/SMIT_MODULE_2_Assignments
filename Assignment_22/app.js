const text = document.getElementById("todoText");
const ul = document.getElementById("todoList");

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    ul.innerHTML = "";
    todos.forEach(todo => {
        ul.innerHTML += `<li>${todo} <button class="edit">Edit</button>
        <button class="del">Del</button></li>`;
    });
    attachEventListeners();
}

function saveToLocalStorage() {
    const todos = [];
    const liItems = ul.getElementsByTagName("li");
    for (let i = 0; i < liItems.length; i++) {
        todos.push(liItems[i].firstChild.nodeValue.trim());
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}

function add() {
    const newTodo = text.value.trim();
    if (newTodo) {
        ul.innerHTML += `<li>${newTodo} <button class="edit">Edit</button>
        <button class="del">Del</button></li>`;
        text.value = "";
        saveToLocalStorage();
        attachEventListeners();
    }
}

function attachEventListeners() {
    const editButtons = document.querySelectorAll(".edit");
    const delButtons = document.querySelectorAll(".del");

    editButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            const newText = prompt("Edit todo item:", event.target.parentElement.firstChild.nodeValue.trim());
            if (newText !== null) {
                event.target.parentElement.firstChild.nodeValue = newText;
                saveToLocalStorage();
            }
        });
    });

    delButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.target.parentElement.remove();
            saveToLocalStorage();
        });
    });
}
loadTodos();