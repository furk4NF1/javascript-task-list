(function (global) {
  'use strict';
  const STORAGE_KEY = 'gunluk-planim-tasks-v1';

  class LocalStorageTaskRepository {
    loadAll() {
      try {
        const tasks = JSON.parse(global.localStorage.getItem(STORAGE_KEY) || '[]');
        return Array.isArray(tasks) ? tasks.filter(global.TaskApp.domain.isTask) : [];
      } catch {
        return [];
      }
    }

    saveAll(tasks) {
      global.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }

  global.TaskApp = global.TaskApp || {};
  global.TaskApp.repository = { LocalStorageTaskRepository };
})(window);
