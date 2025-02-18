import Task from "../models/Task";
import TaskManager from "../services/TaskManager";
import TaskView from "../views/TaskView";

describe("TaskView", () => {
  let taskManager;
  let taskView;
  let pinnedTasksElement;
  let allTasksElement;
  let errorMessageElement;

  beforeEach(() => {
    taskManager = new TaskManager();
    pinnedTasksElement = document.createElement("div");
    allTasksElement = document.createElement("div");
    errorMessageElement = document.createElement("div");
    taskView = new TaskView(
      taskManager,
      pinnedTasksElement,
      allTasksElement,
      errorMessageElement,
    );
  });

  test("should render error message", () => {
    taskManager.errorMessage = "Something went wrong!";
    taskView.render();
    expect(errorMessageElement.textContent).toBe("Something went wrong!");
  });

  test("should display 'No pinned tasks' when there are no pinned tasks", () => {
    taskManager.addTask("Task 1");
    taskView.render();
    expect(pinnedTasksElement.textContent).toBe("No pinned tasks");
    expect(pinnedTasksElement.classList.contains("empty")).toBe(true);
  });

  test("should render all tasks", () => {
    const task1 = new Task("Task 1");
    const task2 = new Task("Task 2");
    taskManager.addTask(task1.name);
    taskManager.addTask(task2.name);
    taskView.render();
    const tasks = allTasksElement.querySelectorAll(".task");
    expect(tasks.length).toBe(2);
    expect(tasks[0].textContent.trim()).toBe("Task 1×");
    expect(tasks[1].textContent.trim()).toBe("Task 2×");
  });

  test("should render filtered tasks", () => {
    const task1 = new Task("First Task");
    const task2 = new Task("Second Task");
    taskManager.addTask(task1.name);
    taskManager.addTask(task2.name);
    taskManager.setFilterText("First");
    taskView.render();
    expect(allTasksElement.querySelectorAll(".task").length).toBe(1);
    expect(allTasksElement.querySelector(".task").textContent).toBe(
      "First Task×",
    );
  });

  test("should display 'No tasks found' when no tasks match filter", () => {
    const task1 = new Task("First Task");
    const task2 = new Task("Second Task");
    taskManager.addTask(task1.name);
    taskManager.addTask(task2.name);
    taskManager.setFilterText("Non-existent");
    taskView.render();
    expect(allTasksElement.textContent).toBe("No tasks found");
    expect(allTasksElement.classList.contains("empty")).toBe(true);
  });

  test("should update pinned task when pin button is clicked", () => {
    const task1 = new Task("Task 1");
    taskManager.addTask(task1.name);
    taskView.render();
    const pinButton = allTasksElement.querySelector(".circle");
    pinButton.click();
    expect(pinnedTasksElement.querySelectorAll(".task").length).toBe(1);
  });

  test("should delete task when delete button is clicked", () => {
    const task1 = new Task("Task 1");
    taskManager.addTask(task1.name);
    taskView.render();
    const deleteButton = allTasksElement.querySelector(".delete");
    deleteButton.click();
    expect(taskManager.tasks).not.toContain(task1);
    expect(allTasksElement.querySelectorAll(".task").length).toBe(0);
  });
});
