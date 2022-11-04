import { createEvent } from 'effector';
import { createLocalStorageStore } from '~/shared/lib/effector-localstorage';
import { getId, Id } from '~/shared/lib/id';
import { Optional } from '~/shared/lib/typescript';

type TaskId = Id;

type TaskStatus = 'active' | 'completed';

export interface Task {
  id: TaskId;
  status: TaskStatus;
  title: string;
  description?: string;
}
type TaskData = Omit<Task, 'id'>;

export type TaskDataWithoutStatus = Omit<TaskData, 'status'>;

type TaskDataOptional = Optional<TaskData>;

const updatedTask = (task: Task, updatedTaskData: TaskDataOptional): Task => ({
  ...task,
  ...updatedTaskData,
});
const taskCreated = createEvent<Task>();

export const taskCreatedByUser = taskCreated.prepend<TaskDataWithoutStatus>(
  (taskData) => ({
    id: getId(),
    status: 'active',
    ...taskData,
  }),
);
export const taskUpdated = createEvent<[TaskId, TaskDataOptional]>();
export const taskStatusUpdated = taskUpdated.prepend<[TaskId, Task['status']]>(
  ([taskId, taskStatus]) => [taskId, { status: taskStatus }],
);
export const taskRemoved = createEvent<TaskId>();
export const taskCompleted = createEvent<TaskId>();

const initialTasks: Array<Task> = [
  {
    id: 1,
    status: 'active',
    title: 'Complete me',
    description: 'I need to hear from John tomorrow',
  },
  {
    id: 2,
    status: 'completed',
    title: "I'm done",
  },
];

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
