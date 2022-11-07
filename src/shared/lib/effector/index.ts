import { Id } from '../id';

export const getEntityById = <TEntity extends { id: Id }>(
  entities: Array<TEntity>,
  entityId: Id,
) => entities.find(({ id }) => id === entityId);
