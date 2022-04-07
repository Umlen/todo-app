window.onload = function() {
    let newTask = document.getElementById('new-task');
    let todoList = document.getElementById('todo-list');
    let filters = {
        all: document.getElementById('all'),
        active: document.getElementById('active'),
        completed: document.getElementById('completed'),
    };
    let clearCompletedBtn = document.getElementById('clear-completed');
    let totalTasksCount = 0;
    tasksCount(totalTasksCount);

    newTask.onfocus = function() {
        if (newTask.value == 'Create a new todo…') newTask.value = '';
    };
    newTask.addEventListener('keydown', newTaskCreate);

    function newTaskCreate(event) {
        if (event.code == 'Enter') {
            let todoItem = document.createElement('div');
            let checkBtn = document.createElement('div');
            let taskText = document.createElement('p');
            let closeBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            todoItem.classList.add('list-item');
            todoItem.setAttribute('data-task-status', 'active');
            checkBtn.classList.add('unchecked');
            taskText.classList.add('task');
            closeBtn.classList.add('close-btn', 'hide');
            closeBtn.innerHTML = '<path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>';
            taskText.textContent = newTask.value;
            todoList.prepend(todoItem);
            todoItem.prepend(checkBtn);
            todoItem.append(taskText);
            taskText.after(closeBtn);
            totalTasksCount++;
            tasksCount(totalTasksCount);
            todoItem.addEventListener('click', taskComplete.bind(todoItem, taskText, checkBtn));
            todoItem.onmouseenter = function(event) {
                event.target.querySelector('svg').classList.remove('hide');
            }
            todoItem.onmouseleave = function(event) {
                event.target.querySelector('svg').classList.add('hide');
            }

        }
    }

    function taskComplete(text, button) {
        this.dataset.taskStatus = 'complete';
        button.classList.add('checked');
        button.innerHTML = '<svg class = "icon-check"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>';
        text.style.color = '#D1D2DA';
        text.style.textDecoration = 'line-through';
        if (totalTasksCount > 0) {
            totalTasksCount--;
            tasksCount(totalTasksCount);
        }
    }

    function tasksCount(count) {
        let itemsCount = document.getElementById('items-count');
        itemsCount.textContent = `${count} items left`;
    }

    /*FILTERS*/

    filters.all.addEventListener('click', function() {
        let tasks = todoList.querySelectorAll('.list-item');
        for (let task of tasks) {
            if (task.classList.contains('hide')) {
                task.classList.remove('hide');
            }
        }
    });

    filters.active.addEventListener('click', function() {
        let tasks = todoList.querySelectorAll('.list-item');
        for (let task of tasks) {
            if (task.dataset.taskStatus == 'complete') {
                task.classList.add('hide');
            }
            else {
                task.classList.remove('hide');
            }
        }
    });

    filters.completed.addEventListener('click', function() {
        let tasks = todoList.querySelectorAll('.list-item');
        for (let task of tasks) {
            if (task.dataset.taskStatus == 'active') {
                task.classList.add('hide');
            }
            else {
                task.classList.remove('hide');
            }
        }
    });

    clearCompletedBtn.onclick = function() {
        let tasks = todoList.querySelectorAll('.list-item');
        for (let task of tasks) {
            if (task.dataset.taskStatus == 'complete') {
                task.remove();
            }
        }
    };

};