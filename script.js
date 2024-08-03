document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const completedCount = document.querySelector('.completed-count');
    const totalCount = document.querySelector('.total-count');
    const progress = document.querySelector('.progress');

    addTaskBtn.addEventListener('click', addTask);
    taskList.addEventListener('click', handleTaskActions);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="edit-btn">✏️</button>
                <button class="delete-btn">🗑️</button>
            </div>
        `;

        taskList.appendChild(taskItem);
        taskInput.value = '';
        updateTaskCount();
    }

    function handleTaskActions(e) {
        if (e.target.classList.contains('delete-btn')) {
            e.target.closest('.task-item').remove();
        } else if (e.target.classList.contains('edit-btn')) {
            const taskItem = e.target.closest('.task-item');
            const taskText = taskItem.querySelector('span').textContent;
            taskInput.value = taskText;
            taskItem.remove();
        }

        updateTaskCount();
    }

    function updateTaskCount() {
        const tasks = taskList.children;
        const totalTasks = tasks.length;
        const completedTasks = [...tasks].filter(task => task.classList.contains('completed')).length;

        completedCount.textContent = completedTasks;
        totalCount.textContent = totalTasks;
        progress.style.width = `${(completedTasks / totalTasks) * 100}%`;
    }

    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'SPAN') {
            const taskItem = e.target.closest('.task-item');
            taskItem.classList.toggle('completed');

            if (taskItem.classList.contains('completed')) {
                triggerConfetti();
            }

            updateTaskCount();
        }
    });

    function triggerConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
});
