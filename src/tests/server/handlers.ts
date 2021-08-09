import { rest } from 'msw';

import { lotteriesDB } from './data';

const API_URL = process.env.REACT_APP_API_URL;

const handlers = [
  rest.get(`${API_URL}/loterias`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(lotteriesDB.lotteries));
  }),

  rest.get(`${API_URL}/loterias-concursos`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(lotteriesDB.lotteriesDrawnings));
  }),

  rest.get(`${API_URL}/concursos/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(lotteriesDB.drawning));
  })
];

export { handlers };
