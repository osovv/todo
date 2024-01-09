import { Id } from '../id';

export const getEntityById = <Entity extends { id: Id }>(
  entities: Array<Entity>,
  entityId: Id,
) => entities.find(({ id }) => id === entityId);
