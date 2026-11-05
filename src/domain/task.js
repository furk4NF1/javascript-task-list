(function (global) {
  'use strict';
  const MAX_TITLE_LENGTH = 120;

  function createTask(title) {
    const normalizedTitle = String(title ?? '').trim();
    if (!normalizedTitle) throw new Error('Görev adı boş olamaz.');
    if (normalizedTitle.length > MAX_TITLE_LENGTH) {
      throw new Error(`Görev adı ${MAX_TITLE_LENGTH} karakterden uzun olamaz.`);
    }
    return {
      id: global.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: normalizedTitle,
      completed: false,
      createdAt: new Date().toISOString()
    };
  }

  function isTask(value) {
    return value !== null && typeof value === 'object'
      && typeof value.id === 'string' && typeof value.title === 'string'
      && typeof value.completed === 'boolean' && typeof value.createdAt === 'string';
  }

  function toggleTask(task) {
    return { ...task, completed: !task.completed };
  }

  global.TaskApp = global.TaskApp || {};
  global.TaskApp.domain = { createTask, isTask, toggleTask };
})(window);
