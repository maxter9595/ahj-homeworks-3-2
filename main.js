/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/models/Task.js
class Task {
  constructor(name) {
    this.id = Date.now() + Math.random().toString(36).slice(2, 11);
    this.name = name;
    this.pinned = false;
  }
  togglePin() {
    this.pinned = !this.pinned;
  }
}
/* harmony default export */ const models_Task = (Task);
;// CONCATENATED MODULE: ./src/js/services/TaskManager.js

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
    const task = new models_Task(name);
    this.tasks.push(task);
  }
  deleteTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
  togglePin(task) {
    task.togglePin();
  }
  setFilterText(text) {
    this.filterText = text;
  }
  getPinnedTasks() {
    return this.tasks.filter(task => task.pinned);
  }
  getAllTasks() {
    return this.tasks.filter(task => !task.pinned);
  }
}
/* harmony default export */ const services_TaskManager = (TaskManager);
;// CONCATENATED MODULE: ./src/js/views/TaskView.js
class TaskView {
  constructor(taskManager, pinnedTasksElement, allTasksElement, errorMessageElement) {
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
      pinned.forEach(task => {
        this.pinnedTasksElement.appendChild(this.createTaskElement(task));
      });
    }
  }
  renderAllTasks() {
    this.allTasksElement.innerHTML = "";
    const allTasks = this.taskManager.getAllTasks();
    const filteredTasks = this.taskManager.filterText ? allTasks.filter(task => task.name.toLowerCase().startsWith(this.taskManager.filterText.toLowerCase())) : allTasks;
    if (filteredTasks.length === 0) {
      this.allTasksElement.textContent = "No tasks found";
      this.allTasksElement.classList.add("empty");
    } else {
      this.allTasksElement.classList.remove("empty");
      filteredTasks.forEach(task => {
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
/* harmony default export */ const views_TaskView = (TaskView);
;// CONCATENATED MODULE: ./src/js/Main.js


class Main {
  constructor() {
    this.taskManager = new services_TaskManager();
    this.taskView = null;
  }
  init() {
    const taskInput = document.getElementById("taskInput");
    const errorMessage = document.getElementById("errorMessage");
    const pinnedTasks = document.getElementById("pinnedTasks");
    const allTasks = document.getElementById("allTasks");
    this.taskView = new views_TaskView(this.taskManager, pinnedTasks, allTasks, errorMessage);
    if (taskInput) {
      taskInput.addEventListener("input", () => this.handleFilterInput()); // Фильтрация
      taskInput.addEventListener("keypress", event => this.handleTaskInput(event));
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
    const filterValue = document.getElementById("taskInput")?.value.toLowerCase() || "";
    this.taskManager.setFilterText(filterValue);
    this.render();
  }
  render() {
    this.taskView.render();
  }
}
/* harmony default export */ const js_Main = (Main);
;// CONCATENATED MODULE: ./src/js/app.js

const app = new js_Main();
app.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;