import { Router, RouterProvider } from '@tanstack/react-router';
import { rootRoute } from '~/shared/routes';
import { homePageRoute } from './home';
import { notFoundRoute } from './not-found';

const routeTree = rootRoute.addChildren([homePageRoute]);

const router = new Router({ routeTree, notFoundRoute });

export const Pages = () => {
  return <RouterProvider router={router} />;
};

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
