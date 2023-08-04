let text = document.getElementById("text");
const addTaskButton = document.getElementById("add-btn");
const saveTaskButton = document.getElementById("save-todo-btn");
const listBox = document.getElementById("thingsToDo");
const saveInd = document.getElementById("saveIndex");

let todoarray = [];

    addTaskButton.addEventListener("click", (e) => {
        e.preventDefault();
        if(text!=""){
        let task = localStorage.getItem("todo");
        if (task === null){
            todoarray=[];
        }
        else{
            todoarray = JSON.parse(task);
        }
        todoarray.push(text.value);
        text.value="";
        localStorage.setItem("todo", JSON.stringify(todoarray));
        displayTodo();
    }
    });
    
    function displayTodo() {
        let task = localStorage.getItem("todo");
        if (task === null) {
          todoarray = [];
        } else {
          todoarray = JSON.parse(task);
        }
        let htmlCode = "";
        todoarray.forEach((list, ind) => {
          htmlCode += `<div class='newContainer'>
          <p class='tasklist'>${list}</p>
          <button onclick='edit(${ind})' class='edit-btn'>Edit</button>
          <button onclick='deleteTodo(${ind})' class='Delete-btn'>Delete</button>
       </div>`;
        });
        listBox.innerHTML = htmlCode;
       }
    
       function deleteTodo(ind) {
        let task = localStorage.getItem("todo");
        todoarray = JSON.parse(task);
        todoarray.splice(ind, 1);
        localStorage.setItem("todo", JSON.stringify(todoarray));
        displayTodo();
       }
    
       function edit(ind) {
        saveInd.value = ind;
        let task = localStorage.getItem("todo");
        todoarray = JSON.parse(task);
        text.value = todoarray[ind];
        addTaskButton.style.display = "none";
        saveTaskButton.style.display = "block";
       }
    
       saveTaskButton.addEventListener("click", () => {
        let task = localStorage.getItem("todo");
        todoarray = JSON.parse(task);
        let id = saveInd.value;
        todoarray[id] = text.value;
        addTaskButton.style.display = "block";
        saveTaskButton.style.display = "none";
        text.value = "";
        localStorage.setItem("todo", JSON.stringify(todoarray));
        displayTodo();
       });


