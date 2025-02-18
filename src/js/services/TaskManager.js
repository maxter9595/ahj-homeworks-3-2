import Task from "../models/Task";

class TaskManager {
  constructor() {
    this.tasks = [];
    this.filterText = "";
    this.errorMessage = "";
  }

  addTask(name) {
    if (name.trim() === "") {
      this.errorMessage = "Please enter a task!";
      return;
    }
    this.errorMessage = "";
    const task = new Task(name);
    this.tasks.push(task);
  }

  deleteTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  togglePin(task) {
    task.togglePin();
  }

  setFilterText(text) {
    this.filterText = text;
  }

  getPinnedTasks() {
    return this.tasks.filter((task) => task.pinned);
  }

  getAllTasks() {
    return this.tasks.filter((task) => !task.pinned);
  }
}

export default TaskManager;
