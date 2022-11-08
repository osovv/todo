import {
  closestCenter,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  SortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Id } from '~/shared/lib/id';

interface SortableItemProps {
  id: Id;
  children: React.ReactNode;
}

const SortableItem = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
};

type Strategy = 'verticalList';

const STRATEGIES: { [S in Strategy]: SortingStrategy } = {
  verticalList: verticalListSortingStrategy,
} as const;

type Collision = 'closestCenter';

const COLLISION_DETECTIONS: { [C in Collision]: CollisionDetection } = {
  closestCenter,
} as const;

interface SortableListProps<TItem extends { id: Id }> {
  items: Array<TItem>;
  strategy?: Strategy;
  collision?: Collision;
  componentFn: (item: TItem) => React.ReactNode;
  itemMoved: (payload: { from: number; to: number }) => void;
}

export const SortableList = <TItem extends { id: Id }>({
  items,
  strategy = 'verticalList',
  collision = 'closestCenter',
  componentFn,
  itemMoved,
}: SortableListProps<TItem>) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const getIndex = (id: Id) =>
    items.findIndex(({ id: itemId }) => itemId === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    if (active.id !== over.id) {
      const from = getIndex(active.id as string);
      const to = getIndex(over.id as string);

      if (from !== -1 && to !== -1) {
        return itemMoved({ from, to });
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={COLLISION_DETECTIONS[collision]}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={STRATEGIES[strategy]}>
        {items.map((item) => (
          <SortableItem key={item.id} id={item.id}>
            {componentFn(item)}
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};
