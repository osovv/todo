import { createRoute } from 'atomic-router';

export const routes = {
  home: createRoute(),
  errors: {
    notFound: createRoute(),
  },
};
