let tasks= JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks(){
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let taskDiv = document.createElement("div");
        taskDiv.className = `task ${task.completed ? "completed" : ""}`;

        let checkbox = `<input type="checkbox" ${task.completed ? "checked" : ""} onchange="toggleTask(${i})" class="checkbox">`;
        let span = `<span class="task-text">${task.text}</span>`;
        let buttonContainer = `
            <div class="button-container">
                <button onclick="editTodo(${i})" class="editbtn">Edit</button>
                <button onclick="deleteTodo(${i})" class="deletebtn">Delete</button>
            </div>
        `;

        taskDiv.innerHTML = checkbox + span + buttonContainer;
        taskList.appendChild(taskDiv);
    }
}


function addTodo(){
    let taskInput= document.getElementById("todo").value.trim();
    if(taskInput==""){
        alert("Task cannot be empty!");
        return;
    }
    tasks.push({
        text: taskInput,
        completed: false
    });
    saveTasks();
    displayTasks();
    taskInput.value="";
}

function editTodo(index){
    let newText= prompt("Edit task: ", tasks[index].text);
    if(newText!= null && newText.trim()!= ""){
        tasks[index].text=newText
        saveTasks();
        displayTasks();
    }
}

function deleteTodo(index){
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function toggleTask(index){
    tasks[index].completed= !tasks[index].completed;
    saveTasks();
    displayTasks();
}
displayTasks();