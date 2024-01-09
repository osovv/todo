import compose from 'compose-function';
import { withReatomContext } from './with-reatom-context';
import { withTheme } from './with-theme';

export const withProviders = compose(withTheme, withReatomContext);
