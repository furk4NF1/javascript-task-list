(function (global) {
  'use strict';

  class TaskController {
    constructor(service, view) {
      this.service = service;
      this.view = view;
      this.activeFilter = 'all';
    }

    start() {
      this.view.bind({
        onAdd: (title) => this.addTask(title),
        onToggle: (id) => this.runAction(() => this.service.toggleTask(id)),
        onDelete: (id) => this.runAction(() => this.service.deleteTask(id)),
        onFilter: (filter) => this.changeFilter(filter),
        onClearCompleted: () => this.runAction(() => this.service.clearCompletedTasks())
      });
      this.refresh();
    }

    addTask(title) {
      try {
        this.service.addTask(title);
        this.activeFilter = 'all';
        this.view.clearInput();
        this.view.showMessage('Görev eklendi.');
        this.refresh();
        this.view.focusInput();
      } catch (error) {
        this.view.showMessage(error.message || 'Görev eklenemedi.', true);
      }
    }

    changeFilter(filter) {
      this.activeFilter = filter;
      this.view.showMessage('');
      this.refresh();
    }

    runAction(action) {
      try {
        action();
        this.view.showMessage('');
        this.refresh();
      } catch {
        this.view.showMessage('Görevler kaydedilemedi. Tarayıcı depolama alanını kontrol et.', true);
      }
    }

    refresh() {
      this.view.render(
        this.service.getTasks(this.activeFilter),
        this.service.getSummary(),
        this.activeFilter
      );
    }
  }

  global.TaskApp = global.TaskApp || {};
  global.TaskApp.presentation = global.TaskApp.presentation || {};
  global.TaskApp.presentation.TaskController = TaskController;
})(window);
