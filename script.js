window.onload = function() {
    
    /*FOR MOBILE*/
    if (document.documentElement.clientWidth < 480) {
        mobileResolution();
    }
    
    let newTask = document.getElementById('new-task');
    let todoList = document.getElementById('todo-list');
    let filters = {
        all: document.getElementById('all'),
        active: document.getElementById('active'),
        completed: document.getElementById('completed'),
    };
    let clearCompletedBtn = document.getElementById('clear-completed');
    let themeChangeCheck = document.getElementById('theme-change-checkbox');

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

            checkBtn.addEventListener('mouseenter', function(event) {
                if (event.target.classList.contains('checked')) return;
                event.target.classList.add('unchecked-hover');
            });
            checkBtn.addEventListener('mouseleave', function(event) {
                event.target.classList.remove('unchecked-hover');
            });

            closeBtn.addEventListener('click', deleteOneTask.bind(closeBtn))
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
        if (totalTasksCount > 0 && this.dataset.taskStatus != 'complete') {
            totalTasksCount--;
            tasksCount(totalTasksCount);
        }
        this.dataset.taskStatus = 'complete';
        button.classList.add('checked');
        button.innerHTML = '<svg class = "icon-check"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6"/></svg>';
        text.classList.add('task-complete');
    }

    function tasksCount(count) {
        let itemsCount = document.getElementById('items-count');
        itemsCount.textContent = `${count} items left`;
    }

    function deleteOneTask() {
        this.closest('.list-item').remove();
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

    /*THEME CHANGE*/

    themeChangeCheck.onchange = function() {
        if (themeChangeCheck.checked) darkTheme();
        else lightTheme();
    };

    function darkTheme() {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        document.getElementById('dark-theme-on').classList.add('hide');
        document.getElementById('light-theme-on').classList.remove('hide');

    }

    function lightTheme() {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        document.getElementById('dark-theme-on').classList.remove('hide');
        document.getElementById('light-theme-on').classList.add('hide');
    }

    function mobileResolution() { 
            let filters = document.getElementById('filters');
            let todoList = document.getElementById('todo-list');
            todoList.after(filters);
    }
};