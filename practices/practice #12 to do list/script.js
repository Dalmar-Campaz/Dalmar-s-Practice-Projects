const tasksBox = document.getElementById("tasks");
const addBtn = document.getElementById("add");
const tasktxt = document.getElementById("task-text");

function createTask(taskText) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");

  const check = document.createElement("input");
  check.type = "checkbox";
  check.onclick = () => {
    taskDiv.classList.toggle("completed");
  }

  const taskName = document.createElement("span");
  taskName.textContent = taskText;

  const deleteTask = document.createElement("i");
  deleteTask.classList.add("fa-solid");
  deleteTask.classList.add("fa-trash");
  deleteTask.onclick = () => {
    taskDiv.remove();
  };

  taskDiv.appendChild(check);
  taskDiv.appendChild(taskName);
  taskDiv.appendChild(deleteTask);
  tasksBox.appendChild(taskDiv);
}

addBtn.addEventListener("click", () => {
  const task = tasktxt.value.trim();
  if (task != "") {
    createTask(task);
    tasktxt.value = "";
  } else {
    alert("Ingrese el nombre de una tarea");
  }
});
tasktxt.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});
