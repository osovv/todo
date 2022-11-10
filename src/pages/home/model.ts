import { chainRoute } from 'atomic-router';
import { taskModel } from '~/entities/task';
import { routes } from '~/shared/routes';

export const homePageRoute = chainRoute({
  route: routes.home,
  beforeOpen: {
    effect: taskModel.getTasksValueFx,
    mapParams: () => {},
  },
});
