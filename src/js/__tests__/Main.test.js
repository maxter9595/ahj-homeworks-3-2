import Main from "../Main";
import TaskManager from "../services/TaskManager";
import TaskView from "../views/TaskView";

describe("Main class", () => {
  let main;
  let taskManager;
  let taskView;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="taskInput" />
      <div id="errorMessage"></div>
      <div id="pinnedTasks"></div>
      <div id="allTasks"></div>
    `;
    taskManager = new TaskManager();
    taskView = new TaskView(
      taskManager,
      document.getElementById("pinnedTasks"),
      document.getElementById("allTasks"),
      document.getElementById("errorMessage"),
    );
    main = new Main();
    main.init();
  });

  test("should initialize correctly", () => {
    expect(main.taskManager).toStrictEqual(taskManager);
    expect(main.taskView).toStrictEqual(taskView);
    expect(document.getElementById("taskInput")).not.toBeNull();
    expect(document.getElementById("errorMessage")).not.toBeNull();
    expect(document.getElementById("pinnedTasks")).not.toBeNull();
    expect(document.getElementById("allTasks")).not.toBeNull();
  });
});

describe("Task input", () => {
  let main;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="taskInput" />
      <div id="errorMessage"></div>
      <div id="pinnedTasks"></div>
      <div id="allTasks"></div>
    `;
    main = new Main();
    main.init();
  });

  test("should add task on Enter key press", () => {
    const input = document.getElementById("taskInput");
    input.value = "New Task";
    input.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));
    const allTasks = document.getElementById("allTasks");
    const taskElements = allTasks.querySelectorAll(".task");
    expect(taskElements.length).toBe(1);
    expect(taskElements[0].textContent.trim()).toBe("New Task×");
  });

  test("should show error message when task name is empty", () => {
    const input = document.getElementById("taskInput");
    input.value = "";
    input.dispatchEvent(new KeyboardEvent("keypress", { key: "Enter" }));
    const errorMessage = document.getElementById("errorMessage");
    expect(errorMessage.textContent).toBe("Task name cannot be empty");
  });
});

describe("Task filtering", () => {
  let main;

  beforeEach(() => {
    document.body.innerHTML = `
      <input id="taskInput" />
      <div id="errorMessage"></div>
      <div id="pinnedTasks"></div>
      <div id="allTasks"></div>
    `;
    main = new Main();
    main.init();
    main.taskManager.addTask("Task 1");
    main.taskManager.addTask("Task 2");
    main.taskManager.addTask("Another Task");
  });

  test("should filter tasks based on input", () => {
    const input = document.getElementById("taskInput");
    input.value = "task";
    input.dispatchEvent(new Event("input"));
    const allTasks = document.getElementById("allTasks");
    const taskElements = allTasks.querySelectorAll(".task");
    expect(taskElements.length).toBe(2);
  });

  test("should render no tasks if filter does not match", () => {
    const input = document.getElementById("taskInput");
    input.value = "nonexistent";
    input.dispatchEvent(new Event("input"));
    const allTasks = document.getElementById("allTasks");
    const taskElements = allTasks.querySelectorAll(".task");
    expect(taskElements.length).toBe(0);
  });

  test("should log error if #taskInput element is not found", () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    document.body.innerHTML =
      "<div id='errorMessage'></div><div id='pinnedTasks'></div><div id='allTasks'></div>";
    const main = new Main();
    main.init();
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Элемент #taskInput не найден!",
    );
    consoleErrorSpy.mockRestore();
  });
});
