// Função para carregar as tarefas do localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})">
            <input type="text" value="${task.text}" onchange="editTask(${index}, this.value)" class="${task.completed ? 'completed' : ''}">
            <button onclick="deleteTask(${index})">Excluir</button>
        `;
        todoList.appendChild(li);
    });
}

// Função para adicionar uma nova tarefa
function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();
    if (taskText === "") {
        showFeedback("Por favor, insira uma tarefa válida!");
        return;
    }
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    newTaskInput.value = '';
    loadTasks();
    showFeedback("Tarefa adicionada com sucesso!");
}

// Função para editar uma tarefa existente
function editTask(index, newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (newText.trim()) {
        tasks[index].text = newText.trim();
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
    }
}

// Função para excluir uma tarefa
function deleteTask(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
    showFeedback("Tarefa excluída com sucesso!");
}

// Função para marcar/desmarcar uma tarefa como concluída
function toggleComplete(index) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Função para ordenar tarefas por status (concluída/não concluída)
function sortTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.sort((a, b) => a.completed - b.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Função para exportar tarefas para um arquivo JSON
function exportTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const dataStr = JSON.stringify(tasks);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.json';
    a.click();
}

// Função para importar tarefas de um arquivo JSON
function importTasks(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function (e) {
        const tasks = JSON.parse(e.target.result);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        loadTasks();
        showFeedback("Tarefas importadas com sucesso!");
    };
    reader.readAsText(file);
}

// Função para exibir feedback visual
function showFeedback(message) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message';
    feedback.textContent = message;
    document.body.appendChild(feedback);
    setTimeout(() => {
        feedback.remove();
    }, 2000); // Remove após 2 segundos
}

// Carregar as tarefas ao carregar a página
window.onload = loadTasks;