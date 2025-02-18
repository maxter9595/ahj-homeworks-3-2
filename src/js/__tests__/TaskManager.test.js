import TaskManager from "../services/TaskManager";
import Task from "../models/Task";

jest.mock("../models/Task");

describe("TaskManager", () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  });

  test("should create a TaskManager instance with empty tasks, filterText, and errorMessage", () => {
    expect(taskManager.tasks).toEqual([]);
    expect(taskManager.filterText).toBe("");
    expect(taskManager.errorMessage).toBe("");
  });

  test("should add a task to the tasks array", () => {
    const taskName = "Test Task";
    const task = { id: "some-id", name: taskName, pinned: false };
    Task.mockImplementation(() => task);
    taskManager.addTask(taskName);
    expect(taskManager.tasks).toContain(task);
    expect(taskManager.errorMessage).toBe("");
  });

  test("should not add a task if the name is empty and set an error message", () => {
    taskManager.addTask("  ");
    expect(taskManager.tasks.length).toBe(0);
    expect(taskManager.errorMessage).toBe("Please enter a task!");
  });

  test("should delete a task by its id", () => {
    const task1 = { id: "task1-id", name: "Task 1", pinned: false };
    const task2 = { id: "task2-id", name: "Task 2", pinned: false };
    Task.mockImplementationOnce(() => task1);
    Task.mockImplementationOnce(() => task2);
    taskManager.addTask(task1.name);
    taskManager.addTask(task2.name);
    taskManager.tasks = [task1, task2];
    const taskId = task1.id;
    taskManager.deleteTask(taskId);
    expect(taskManager.tasks).not.toContainEqual(task1);
    expect(taskManager.tasks).toContainEqual(task2);
  });

  test("should set filterText correctly", () => {
    const filterText = "test";
    taskManager.setFilterText(filterText);
    expect(taskManager.filterText).toBe(filterText);
  });

  test("should return pinned tasks", () => {
    const task = new Task("Task 1");
    task.pinned = true;
    taskManager.addTask(task.name);
    const pinnedTasks = taskManager.getPinnedTasks();
    expect(pinnedTasks).toContain(task);
  });

  test("should return non-pinned tasks", () => {
    const task1 = new Task("Task 1");
    task1.pinned = false;
    const task2 = new Task("Task 2");
    taskManager.addTask(task1.name);
    taskManager.addTask(task2.name);
    const nonPinnedTasks = taskManager.getAllTasks();
    expect(nonPinnedTasks).toContain(task1);
    expect(nonPinnedTasks).toContain(task2);
  });
});
