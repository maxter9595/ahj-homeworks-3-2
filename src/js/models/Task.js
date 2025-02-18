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

export default Task;
