import { setupServer } from 'msw/node';

import { lotteriesDB } from './data';
import { handlers } from './handlers';

const server = setupServer(...handlers);

export * from 'msw';
export { server, lotteriesDB };
