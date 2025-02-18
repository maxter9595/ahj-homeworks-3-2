import Task from "../models/Task";

describe("Task", () => {
  let task;

  beforeEach(() => {
    task = new Task("Test Task");
  });

  test("should create a task with a unique id", () => {
    expect(task.id).toBeDefined();
  });

  test("should initialize with the correct name", () => {
    expect(task.name).toBe("Test Task");
  });

  test("should initialize with pinned set to false", () => {
    expect(task.pinned).toBe(false);
  });

  test("should toggle pinned state when togglePin is called", () => {
    expect(task.pinned).toBe(false);
    task.togglePin();
    expect(task.pinned).toBe(true);
    task.togglePin();
    expect(task.pinned).toBe(false);
  });

  test("should have a unique id for each instance", () => {
    const task1 = new Task("Task 1");
    const task2 = new Task("Task 2");
    expect(task1.id).not.toBe(task2.id);
  });

  test("should not modify name or id when togglePin is called", () => {
    const initialName = task.name;
    const initialId = task.id;
    task.togglePin();
    expect(task.name).toBe(initialName);
    expect(task.id).toBe(initialId);
  });
});
