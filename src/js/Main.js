import TaskManager from "./services/TaskManager";
import TaskView from "./views/TaskView";

class Main {
  constructor() {
    this.taskManager = new TaskManager();
    this.taskView = null;
  }

  init() {
    const taskInput = document.getElementById("taskInput");
    const errorMessage = document.getElementById("errorMessage");
    const pinnedTasks = document.getElementById("pinnedTasks");
    const allTasks = document.getElementById("allTasks");
    this.taskView = new TaskView(
      this.taskManager,
      pinnedTasks,
      allTasks,
      errorMessage,
    );
    if (taskInput) {
      taskInput.addEventListener("input", () => this.handleFilterInput()); // Фильтрация
      taskInput.addEventListener("keypress", (event) =>
        this.handleTaskInput(event),
      );
    } else {
      console.error("Элемент #taskInput не найден!");
    }
    this.render();
  }

  handleTaskInput(event) {
    if (event.key === "Enter") {
      const taskName = event.target.value.trim();
      if (taskName) {
        this.taskManager.addTask(taskName);
        event.target.value = "";
        this.taskManager.filterText = "";
        this.render();
      } else {
        this.taskManager.errorMessage = "Task name cannot be empty";
        this.render();
      }
    }
  }

  handleFilterInput() {
    const filterValue =
      document.getElementById("taskInput")?.value.toLowerCase() || "";
    this.taskManager.setFilterText(filterValue);
    this.render();
  }

  render() {
    this.taskView.render();
  }
}

export default Main;
