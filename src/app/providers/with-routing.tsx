import { createHistoryRouter } from 'atomic-router';
import { RouterProvider } from 'atomic-router-react';
import { createBrowserHistory } from 'history';
import React from 'react';
import { notFoundRoute, routesMap } from '~/pages';

const history = createBrowserHistory();

const router = createHistoryRouter({
  routes: routesMap,
  notFoundRoute,
});

router.setHistory(history);

export const withRouting = (children: () => React.ReactNode) => () => {
  return <RouterProvider router={router}>{children()}</RouterProvider>;
};
