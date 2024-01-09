import { RootRoute, Route } from '@tanstack/react-router';

export const rootRoute = new RootRoute();

export const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
});

export const routes = {
  home: indexRoute,
};
