(function (global) {
  'use strict';

  class TaskService {
    constructor(repository) {
      this.repository = repository;
    }

    getTasks(filter = 'all') {
      const tasks = this.repository.loadAll();
      if (filter === 'open') return tasks.filter((task) => !task.completed);
      if (filter === 'done') return tasks.filter((task) => task.completed);
      return tasks;
    }

    getSummary() {
      const tasks = this.repository.loadAll();
      const completed = tasks.filter((task) => task.completed).length;
      return { total: tasks.length, completed, remaining: tasks.length - completed };
    }

    addTask(title) {
      const task = global.TaskApp.domain.createTask(title);
      this.repository.saveAll([task, ...this.repository.loadAll()]);
    }

    toggleTask(id) {
      const tasks = this.repository.loadAll();
      if (!tasks.some((task) => task.id === id)) return false;
      this.repository.saveAll(tasks.map((task) => (
        task.id === id ? global.TaskApp.domain.toggleTask(task) : task
      )));
      return true;
    }

    deleteTask(id) {
      const tasks = this.repository.loadAll();
      const remainingTasks = tasks.filter((task) => task.id !== id);
      if (remainingTasks.length === tasks.length) return false;
      this.repository.saveAll(remainingTasks);
      return true;
    }

    clearCompletedTasks() {
      const remainingTasks = this.repository.loadAll().filter((task) => !task.completed);
      this.repository.saveAll(remainingTasks);
    }
  }

  global.TaskApp = global.TaskApp || {};
  global.TaskApp.service = { TaskService };
})(window);
