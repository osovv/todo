import { IconButton } from '@material-tailwind/react';
import { useState } from 'react';
import { TaskCard } from '~/entities/task';
import { Task } from '~/entities/task/model';
import { DeleteTask } from '~/features/delete-task';
import { EditTask } from '~/features/edit-task';
import { ToggleTask } from '~/features/toggle-task-status';
import { Icon } from '~/shared/ui';

type Mode = 'view' | 'edit';

interface ToggleModeProps {
  setMode: (mode: Mode) => void;
}

const ToggleMode = ({ setMode }: ToggleModeProps) => {
  return (
    <IconButton variant='text' size='sm' onClick={() => setMode('edit')}>
      <Icon size='6' name='PencilSquareIcon' />
    </IconButton>
  );
};

interface TaskManagerProps {
  id: Task['id'];
}

export const TaskManager = ({ id }: TaskManagerProps) => {
  const [mode, setMode] = useState<Mode>('view');

  const onClose = () => setMode('view');

  const onSubmit = () => setMode('view');

  if (mode === 'view') {
    return (
      <TaskCard
        id={id}
        ToggleStatusSlot={<ToggleTask id={id} />}
        EditSlot={<ToggleMode setMode={setMode} />}
        DeleteSlot={<DeleteTask id={id} />}
      />
    );
  }

  return <EditTask id={id} onClose={onClose} onSubmit={onSubmit} />;
};
