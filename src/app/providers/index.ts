import compose from 'compose-function';
import { withReatomContext } from './with-reatom-context';
import { withRouting } from './with-routing';
import { withTheme } from './with-theme';

export const withProviders = compose(withTheme, withRouting, withReatomContext);
