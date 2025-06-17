const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

const filterSelect = document.getElementById('filter');
filterSelect.addEventListener('change', e => {
    currentFilter = e.target.value;
    renderTodos();
});

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
    list.innerHTML = '';
    todos
        .filter(todo => {
            if (currentFilter === 'all') return true;
            if (currentFilter === 'active') return !todo.done;
            if (currentFilter === 'completed') return todo.done;
        })

        .forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = 'todo-item';

            const span = document.createElement('span');
            span.textContent = todo.text;
            if (todos.done) span.style.textDecoration = 'line-through';
            span.addEventListener('click', () => {
                todos[index].done = !todos[index].done;
                saveTodos();
                renderTodos();
            });

            const btn = document.createElement('button');
            btn.textContent = '🗑️';
            btn.addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });

            li.appendChild(span);
            li.appendChild(btn);
            list.appendChild(li);
        });
}

form.addEventListener('submit' , e => {
    e.preventDefault();
    const newTodo = {
        text: input.value.trim(),
        done: false,
    };
    if (newTodo.text) {
        todos.push(newTodo);
        saveTodos();
        renderTodos();
        input.value = '';
    }
});

renderTodos();
