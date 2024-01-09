import { action, atom } from '@reatom/framework';
import { withLocalStorage } from '@reatom/persist-web-storage';
import { arrayMove } from '~/shared/lib/array';
import { Id } from '~/shared/lib/id';
import { Optional } from '~/shared/lib/typescript';

type TaskStatus = 'active' | 'completed';

type TaskId = Id;

export interface Task {
  id: TaskId;
  status: TaskStatus;
  title: string;
  description?: string;
}

type TaskData = Omit<Task, 'id'>;

export type TaskDataWithoutStatus = Omit<TaskData, 'status'>;

export type TaskDataOptional = Optional<TaskData>;

export interface Filter {
  status: TaskStatus | undefined;
}

const DEFAULT_FILTER: Filter = {
  status: undefined,
};

const INITIAL_TASKS: Array<Task> = [
  {
    id: '1',
    status: 'active',
    title: 'Complete me',
    description: 'I need to hear from John tomorrow',
  },
  {
    id: '2',
    status: 'completed',
    title: "I'm done",
  },
];

export const filterAtom = atom(DEFAULT_FILTER, 'filterAtom').pipe(
  withLocalStorage('filter'),
);

export const tasksAtom = atom(INITIAL_TASKS, 'tasksAtom').pipe(
  withLocalStorage('tasks'),
);

export const visibleTasksAtom = atom((ctx) => {
  const tasks = ctx.spy(tasksAtom);

  const filter = ctx.spy(filterAtom);

  return tasks.filter(
    (task) => filter.status === undefined || filter.status === task.status,
  );
}, 'visibleTasksAtom');

const updatedTask = (task: Task, updatedTaskData: TaskDataOptional): Task => ({
  ...task,
  ...updatedTaskData,
});

export const updateTask = action(
  (ctx, { id, data }: { id: TaskId; data: TaskDataOptional }) => {
    const oldTasks = ctx.get(tasksAtom);

    const newTasks = oldTasks.map((task) => {
      if (task.id === id) {
        return updatedTask(task, data);
      }
      return task;
    });

    tasksAtom(ctx, newTasks);
  },
  'updateTask',
);

export const moveTask = action(
  (ctx, { from, to }: { from: number; to: number }) => {
    const oldTasks = ctx.get(tasksAtom);
    const newTasks = arrayMove(oldTasks, { from, to });
    tasksAtom(ctx, newTasks);
  },
  'moveTask',
);
