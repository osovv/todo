import { Route } from 'atomic-router-react';
import { routes } from '~/shared/routes';
import { HomePage, homePageRoute } from './home';
import { NotFoundPage } from './not-found';

export const Pages = () => {
  return (
    <>
      <Route route={homePageRoute} view={HomePage} />
      <Route route={routes.errors.notFound} view={NotFoundPage} />
    </>
  );
};

export const routesMap = [{ path: '/', route: routes.home }];

export const notFoundRoute = routes.errors.notFound;
