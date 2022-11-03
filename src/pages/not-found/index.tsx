import { Link } from 'atomic-router-react';
import { routes } from '~/shared/routes';

export const NotFoundPage = () => {
  return (
    <div>
      <h1 className='text-3xl font-bold text-red-500'>Not found</h1>
      <Link to={routes.home}>Back to home</Link>
    </div>
  );
};
