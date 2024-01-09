import { Link, NotFoundRoute } from '@tanstack/react-router';
import { rootRoute, routes } from '~/shared/routes';

const NotFoundPage = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-red-500'>Not found</h1>
      <Link to={routes.home.fullPath}>Back to home</Link>
    </div>
  );
};

export const notFoundRoute = new NotFoundRoute({
  getParentRoute: () => rootRoute,
  component: NotFoundPage,
});
