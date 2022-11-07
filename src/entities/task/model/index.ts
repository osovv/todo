import { createEvent } from 'effector';
import { createLocalStorageStore } from '~/shared/lib/effector-localstorage';
import { Id } from '~/shared/lib/id';
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

export const taskUpdated = createEvent<{
  id: TaskId;
  data: TaskDataOptional;
}>();

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

export const $tasksIds = $tasks.map((tasks) => tasks.map(({ id }) => id));

$tasks.on(
  taskUpdated,
  (currentTasks, { id: updatedTaskId, data: updatedTaskData }) =>
    currentTasks.map((task) => {
      if (task.id === updatedTaskId) {
        return updatedTask(task, updatedTaskData);
      }
      return task;
    }),
);
