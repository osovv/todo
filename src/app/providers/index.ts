import compose from 'compose-function';
import { withEffectorScope } from './with-effector-scope';
import { withRouting } from './with-routing';
import { withTheme } from './with-theme';

export const withProviders = compose(withTheme, withRouting, withEffectorScope);
