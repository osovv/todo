import './styles/tailwind.css';
import { Pages } from '~/pages';
import { Layout } from './layout';
import { withProviders } from './providers';

export const App = withProviders(() => {
  return (
    <Layout>
      <Pages />
    </Layout>
  );
});
