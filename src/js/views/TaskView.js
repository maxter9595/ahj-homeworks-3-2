class TaskView {
  constructor(
    taskManager,
    pinnedTasksElement,
    allTasksElement,
    errorMessageElement,
  ) {
    this.taskManager = taskManager;
    this.pinnedTasksElement = pinnedTasksElement;
    this.allTasksElement = allTasksElement;
    this.errorMessageElement = errorMessageElement;
  }

  render() {
    this.renderError();
    this.renderPinnedTasks();
    this.renderAllTasks();
  }

  renderError() {
    this.errorMessageElement.textContent = this.taskManager.errorMessage || "";
  }

  renderPinnedTasks() {
    this.pinnedTasksElement.innerHTML = "";
    const pinned = this.taskManager.getPinnedTasks();
    if (pinned.length === 0) {
      this.pinnedTasksElement.textContent = "No pinned tasks";
      this.pinnedTasksElement.classList.add("empty");
    } else {
      this.pinnedTasksElement.classList.remove("empty");
      pinned.forEach((task) => {
        this.pinnedTasksElement.appendChild(this.createTaskElement(task));
      });
    }
  }

  renderAllTasks() {
    this.allTasksElement.innerHTML = "";
    const allTasks = this.taskManager.getAllTasks();
    const filteredTasks = this.taskManager.filterText
      ? allTasks.filter((task) =>
          task.name
            .toLowerCase()
            .startsWith(this.taskManager.filterText.toLowerCase()),
        )
      : allTasks;
    if (filteredTasks.length === 0) {
      this.allTasksElement.textContent = "No tasks found";
      this.allTasksElement.classList.add("empty");
    } else {
      this.allTasksElement.classList.remove("empty");
      filteredTasks.forEach((task) => {
        this.allTasksElement.appendChild(this.createTaskElement(task));
      });
    }
  }

  createTaskElement(task) {
    const taskElem = document.createElement("div");
    taskElem.className = "task";
    taskElem.textContent = task.name;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.className = "delete";
    deleteButton.onclick = () => {
      this.taskManager.deleteTask(task.id);
      this.render();
    };
    const pinButton = document.createElement("div");
    pinButton.className = `circle ${task.pinned ? "filled" : "empty"}`;
    pinButton.innerHTML = task.pinned ? "✔" : "";
    pinButton.onclick = () => {
      this.taskManager.togglePin(task);
      this.render();
    };
    taskElem.appendChild(pinButton);
    taskElem.appendChild(deleteButton);
    return taskElem;
  }
}

export default TaskView;
