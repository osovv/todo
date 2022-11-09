import {
  closestCenter,
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DraggableAttributes,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  SortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Id } from '~/shared/lib/id';

interface SortableItemProps {
  id: Id;
  children: (
    attributes: DraggableAttributes,
    listeners: SyntheticListenerMap | undefined,
  ) => React.ReactNode;
}

const SortableItem = ({ id, children }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: React.CSSProperties = {
    transform: `translate3d(${transform?.x || 0}px, ${transform?.y || 0}px, 0)`,
    transition,
    touchAction: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} tabIndex={-1}>
      {children(attributes, listeners)}
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
  componentFn: (
    attributes: DraggableAttributes,
    listeners: SyntheticListenerMap | undefined,
    item: TItem,
  ) => React.ReactNode;
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
    useSensor(TouchSensor),
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
            {(attributes, listeners) =>
              componentFn(attributes, listeners, item)
            }
          </SortableItem>
        ))}
      </SortableContext>
    </DndContext>
  );
};
