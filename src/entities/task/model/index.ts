import { createEvent } from 'effector';
import { createLocalStorageStore } from '~/shared/lib/effector-localstorage';
import { getId, Id } from '~/shared/lib/id';

type TaskId = Id;

type TaskStatus = 'active' | 'completed';

interface Task {
  id: TaskId;
  status: TaskStatus;
  title: string;
  description?: string;
}

type TaskData = Omit<Task, 'id' | 'status'>;

const updatedTask = (task: Task, updatedTaskData: TaskData): Task => ({
  ...task,
  ...updatedTaskData,
});

const taskCreated = createEvent<Task>();
const taskUpdated = createEvent<[TaskId, TaskData]>();
const taskRemoved = createEvent<TaskId>();
const taskCompleted = createEvent<TaskId>();

export const taskCreatedByUser = taskCreated.prepend<TaskData>((taskData) => ({
  id: getId(),
  status: 'active',
  ...taskData,
}));

const initialTasks: Array<Task> = [];

export const $tasks = createLocalStorageStore('tasks', initialTasks);

export const $tasksCompleted = $tasks.map((tasks) =>
  tasks.filter((task) => task.status === 'completed'),
);

$tasks.on(taskCreated, (currentTasks, newTask) => [...currentTasks, newTask]);

$tasks.on(taskUpdated, (currentTasks, [updatedTaskId, updatedTaskData]) =>
  currentTasks.map((task) => {
    if (task.id === updatedTaskId) {
      return updatedTask(task, updatedTaskData);
    }
    return task;
  }),
);

$tasks.on(taskRemoved, (currentTasks, removedTaskId) =>
  currentTasks.filter((task) => task.id !== removedTaskId),
);

$tasks.on(taskCompleted, (currentTasks, completedTaskId) =>
  currentTasks.map((task) => {
    if (task.id === completedTaskId) {
      return {
        ...task,
        status: 'completed',
      };
    }
    return task;
  }),
);
