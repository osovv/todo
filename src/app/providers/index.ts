import compose from 'compose-function';
import { withRouting } from './with-routing';
import { withTheme } from './with-theme';

export const withProviders = compose(withTheme, withRouting);
