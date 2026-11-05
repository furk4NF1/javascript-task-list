(function (global) {
  'use strict';

  class TaskView {
    constructor(document) {
      this.document = document;
      this.form = document.querySelector('#task-form');
      this.input = document.querySelector('#task-input');
      this.taskList = document.querySelector('#task-list');
      this.emptyState = document.querySelector('#empty-state');
      this.emptyTitle = document.querySelector('.empty-title');
      this.emptyCopy = document.querySelector('.empty-copy');
      this.taskCount = document.querySelector('#task-count');
      this.progressLabel = document.querySelector('#progress-label');
      this.clearCompletedButton = document.querySelector('#clear-completed');
      this.todayLabel = document.querySelector('#today-label');
      this.message = document.querySelector('#app-message');
      this.filterButtons = [...document.querySelectorAll('[data-filter]')];
    }

    bind(handlers) {
      this.form.addEventListener('submit', (event) => {
        event.preventDefault();
        handlers.onAdd(this.input.value);
      });
      this.filterButtons.forEach((button) => {
        button.addEventListener('click', () => handlers.onFilter(button.dataset.filter));
      });
      this.taskList.addEventListener('click', (event) => {
        const button = event.target.closest('[data-task-action]');
        const item = button?.closest('[data-task-id]');
        if (!button || !item) return;
        if (button.dataset.taskAction === 'toggle') handlers.onToggle(item.dataset.taskId);
        if (button.dataset.taskAction === 'delete') handlers.onDelete(item.dataset.taskId);
      });
      this.clearCompletedButton.addEventListener('click', handlers.onClearCompleted);
    }

    render(tasks, summary, activeFilter) {
      this.updateDate();
      this.updateFilterButtons(activeFilter);
      this.taskList.replaceChildren(...tasks.map((task) => this.createTaskElement(task)));
      this.taskList.hidden = tasks.length === 0;
      this.emptyState.hidden = tasks.length > 0;
      if (tasks.length === 0 && summary.total > 0) {
        this.emptyTitle.textContent = 'Bu filtrede görev yok';
        this.emptyCopy.textContent = 'Başka bir filtre seçebilir veya yeni görev ekleyebilirsin.';
      } else {
        this.emptyTitle.textContent = 'Liste tertemiz';
        this.emptyCopy.textContent = 'Başlamak için yukarıya ilk görevini ekle.';
      }

      if (summary.total === 0) {
        this.taskCount.textContent = 'Henüz görev yok';
        this.progressLabel.textContent = 'Başlamak için bir görev ekle';
      } else {
        this.taskCount.textContent = `${summary.remaining} görev kaldı`;
        this.progressLabel.textContent = `${summary.total} görevden ${summary.completed} tanesi tamamlandı`;
      }
      this.clearCompletedButton.hidden = summary.completed === 0;
    }

    clearInput() { this.input.value = ''; }
    focusInput() { this.input.focus(); }

    showMessage(message, isError = false) {
      this.message.textContent = message;
      this.message.classList.toggle('is-error', isError);
      this.message.hidden = !message;
    }

    updateDate() {
      this.todayLabel.textContent = new Intl.DateTimeFormat('tr-TR', {
        weekday: 'long', day: 'numeric', month: 'long'
      }).format(new Date());
    }

    updateFilterButtons(activeFilter) {
      this.filterButtons.forEach((button) => {
        const isActive = button.dataset.filter === activeFilter;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
      });
    }

    createTaskElement(task) {
      const item = this.document.createElement('li');
      item.className = `task-item${task.completed ? ' is-done' : ''}`;
      item.dataset.taskId = task.id;

      const toggle = this.document.createElement('button');
      toggle.type = 'button';
      toggle.className = 'task-toggle';
      toggle.dataset.taskAction = 'toggle';
      toggle.setAttribute('aria-label', task.completed ? 'Görevi yeniden aç' : 'Görevi tamamla');
      toggle.setAttribute('aria-pressed', String(task.completed));
      if (task.completed) toggle.append(this.createIcon('check'));

      const text = this.document.createElement('span');
      text.className = 'task-text';
      text.textContent = task.title;

      const remove = this.document.createElement('button');
      remove.type = 'button';
      remove.className = 'delete-button';
      remove.dataset.taskAction = 'delete';
      remove.setAttribute('aria-label', `Görevi sil: ${task.title}`);
      remove.append(this.createIcon('delete'));

      item.append(toggle, text, remove);
      return item;
    }

    createIcon(type) {
      const svg = this.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', type === 'check' ? '0 0 16 16' : '0 0 20 20');
      svg.setAttribute('fill', 'none');
      svg.setAttribute('aria-hidden', 'true');
      const path = this.document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', type === 'check'
        ? 'm3.5 8.2 2.8 2.8 6.2-6.4'
        : 'M5.5 6.5h9m-7.8 0 .5 9h5.6l.5-9M8 6.5V4.8h4v1.7m-3 2.1v4.7m2-4.7v4.7');
      path.setAttribute('stroke', 'currentColor');
      path.setAttribute('stroke-width', type === 'check' ? '1.8' : '1.4');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      svg.append(path);
      return svg;
    }
  }

  global.TaskApp = global.TaskApp || {};
  global.TaskApp.presentation = global.TaskApp.presentation || {};
  global.TaskApp.presentation.TaskView = TaskView;
})(window);
