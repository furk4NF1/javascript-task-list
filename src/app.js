(function (global) {
  'use strict';

  const repository = new global.TaskApp.repository.LocalStorageTaskRepository();
  const service = new global.TaskApp.service.TaskService(repository);
  const view = new global.TaskApp.presentation.TaskView(global.document);
  const controller = new global.TaskApp.presentation.TaskController(service, view);

  controller.start();
})(window);
