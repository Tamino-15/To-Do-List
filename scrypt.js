// loading data when windows is opened
window.onload = loadTasks;

// add event listener on form
document.querySelector('form').addEventListener("submit", e => {
    e.preventDefault();
    addTask();
});

// retrieve all the data from localstorage
function loadTasks() {

    // check if localStorage is empty
    if (localStorage.getItem("tasks") == null)
        return;

    // Get the tasks from localStorage and store it into an array
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    // display an img if there are no tasks
    if (tasks.length === 0) {
        document.querySelector('img').style.display = 'block';
    }
    else {
        // Loop through the tasks and add them to the list with HTML
        tasks.forEach(task => {
            const list = document.querySelector('ul');
            const li = document.createElement('li');
            li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${task.completed ? "checked" : ""}>
          <input type="text" value="${task.task}" class="task ${task.completed ? "completed" : ""}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
            list.insertBefore(li, list.children[0]);
        });
    }
}

function addTask() {
    const task = document.querySelector('form input');
    const list = document.querySelector('ul');

    // return if task is empty
    if (task.value === "") {
        alert("Please add some task!");
        return false;
    }

    // check is task already exist
    if (document.querySelector(`input[value="${task.value}"]`)) {
        alert("Task already exist!");
        return false;
    }

    // retrieve the data from localstorage and add the new one
    const taskArray = JSON.stringify([...JSON.parse(localStorage.getItem("tasks") || "[]"), { task: task.value, completed: false }]);
    localStorage.setItem("tasks", taskArray);

    // create list item, add innerHTML and append to ul
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
    list.insertBefore(li, list.children[0]);

    // clear input to write the next task
    task.value = "";

    // change the display value of image
    document.getElementById("image").style.display = 'none';
}

function taskComplete(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    tasks.forEach(task => {
        if (task.task === event.nextElementSibling.value) {
            task.completed = !task.completed;
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    tasks.forEach(task => {
        if (task.task === event.parentNode.children[1].value) {
            // delete task
            tasks.splice(tasks.indexOf(task), 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    event.parentElement.remove();

    // add an img if there are no tasks
    if (tasks.length === 0)
        document.getElementById("image").style.display = 'block';
}

function clearAll(event) {
    localStorage.clear();
}

// store current task to track changes
var currentTask = null;

// get current task
function getCurrentTask(event) {
    currentTask = event.value;
}

// edit the task and update local storage
function editTask(event) {
    let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));

    // check if task is empty
    if (event.value === "") {
        alert("Task is empty!");
        event.value = currentTask;
        return;
    }

    // CHECKS
    tasks.forEach(task => {
        // check if task is done to unable modification
        if (task.task === currentTask) {
            if (task.completed === true) {
                alert("You cannot modify a completed task");
                event.value = currentTask;
                return;
            }
        }
        // check if task already exist
        if (task.task === event.value) {
            alert("Task already exist!");
            event.value = currentTask;
            return;
        }
    });

    // update task
    tasks.forEach(task => {
        if (task.task === currentTask) {
            task.task = event.value;
        }
    });

    // update local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}