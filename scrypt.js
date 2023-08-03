function getTask() {
    var date = document.getElementById("date").value;
    console.log(date);

    var task = document.getElementById("task").value;
    console.log(task);

    // Create a Map
    const toDo = new Map();
    toDo.set(date, task);

    addTaskToList(toDo);
}

const taskList = [];
function addTaskToList(toDoElement) {
    taskList.push(toDoElement);

    console.log(taskList);
}

function displayTask() {
    var date = 
}