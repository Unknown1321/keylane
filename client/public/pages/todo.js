

const socket = io('http://localhost:5000/');
const todosFetch = 'http://localhost:5000/api/todo';

let todos = [];
let popupActive = false;

async function setPopupActive(active) {
    const popup = document.getElementById("popup");
    popup.style.display = active ? "block" : "none";
    popupActive = active;

}

async function fetchTodos() {
    try {
        const response = await fetch(todosFetch);
        const data = await response.json();
        todos = data;
        renderTodos();
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
}

async function addTodo() {
    const newTodoInput = document.getElementById("newTodo");
    const newTodoText = newTodoInput.value.trim();

    if (newTodoText) {
        try {
            const response = await fetch(todosFetch, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: newTodoText, complete: false }),
            });

            const newTodo = await response.json();
            todos.push(newTodo);
            newTodoInput.value = "";
            setPopupActive(false);
            renderTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    }
}

async function completeTodo(index) {
    if (index >= 0 && index < todos.length) {
        const updatedTodo = { ...todos[index], complete: !todos[index].complete };

        try {
            const response = await fetch(`${todosFetch}/${updatedTodo._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedTodo),
            });

            const data = await response.json();

            if (data && data._id) {
                todos[index] = data;
                renderTodos();
            } else {
                console.error('Incomplete data returned after completing todo:', data);
            }
        } catch (error) {
            console.error('Error completing todo:', error);
        }
    }
}

async function deleteTodo(index) {
    if (index >= 0 && index < todos.length) {
        const todoId = todos[index]._id;

        try {
            await fetch(`${todosFetch}/${todoId}`, {
                method: 'DELETE',
            });

            todos.splice(index, 1);
            renderTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    }
}

function renderTodos() {
    const todosContainer = document.querySelector(".todos");
    todosContainer.innerHTML = "";

    if (todos.length > 0) {
        todos.forEach((todo, index) => {
            const todoElement = document.createElement("div");
            todoElement.className = `todo ${todo.complete ? "is-complete" : ""}`;
            todoElement.innerHTML = `
                <div class="checkbox" onclick="completeTodo(${index})"></div>
                <div class="text">${todo.text}</div>
                <div class="delete-todo" onclick="deleteTodo(${index})">x</div>
            `;
            todosContainer.appendChild(todoElement);
        });
    } else {
        todosContainer.innerHTML = "<p>You currently have no tasks</p>";
    }
}

renderTodos();

window.addEventListener('DOMContentLoaded', fetchTodos); 
