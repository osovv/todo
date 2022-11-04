import { fork } from 'effector';
import { Provider } from 'effector-react';

const scope = fork();

export const withEffectorScope = (children: () => React.ReactNode) => () => {
  return <Provider value={scope}>{children()}</Provider>;
};
