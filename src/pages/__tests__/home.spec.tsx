import {
  screen,
  render,
  within,
  waitForElementToBeRemoved,
  fireEvent
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Context as ResponsiveContext } from 'react-responsive';

import { server, rest } from 'tests/server';
import { lotteriesDB } from 'tests/server/data';
import { buildDrawing } from 'tests/factories';

import { formatDate } from 'utils/helpers';

import { Home } from 'pages/home';

const API_URL = process.env.REACT_APP_API_URL;

async function waitForLoadingToBeRemoved() {
  return waitForElementToBeRemoved(
    () => [
      ...screen.queryAllByLabelText(/carregando/i),
      ...screen.queryAllByText(/carregando/i)
    ],
    { timeout: 4000 }
  );
}

describe('Home Page', () => {
  it('should render welcome screen initially', async () => {
    render(<Home />);

    expect(
      screen.getByRole('heading', { name: /loterias online da caixa/i })
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/carregando/i)).toBeInTheDocument();

    await waitForLoadingToBeRemoved();
  });

  it('should render home page correctly', async () => {
    render(<Home />, {
      wrapper: ({ children }) => (
        <ResponsiveContext.Provider value={{ width: 1300 }}>
          {children}
        </ResponsiveContext.Provider>
      )
    });

    await waitForLoadingToBeRemoved();

    expect(
      screen.getByRole('heading', {
        name: new RegExp(lotteriesDB.lotteries[0].nome, 'i')
      })
    ).toBeInTheDocument();

    const selectEl = screen.getByRole('combobox', {
      name: /escolha a loteria/i
    });

    const numbersListEl = screen.getByRole('list', {
      name: /números sorteados/i
    });

    expect(selectEl).toHaveValue(lotteriesDB.lotteries[0].nome);

    // Ensure that has all options with lotteries name
    lotteriesDB.lotteries.forEach((lottery) => {
      expect(
        within(selectEl).getByRole('option', {
          name: new RegExp(lottery.nome, 'i')
        })
      ).toBeInTheDocument();
    });

    // Ensure that has drawn numbers items
    lotteriesDB.drawing.numeros.forEach((number) => {
      expect(
        within(numbersListEl).getByText(String(number))
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText(new RegExp(`${lotteriesDB.drawing.id}`, 'i'))
    ).toBeInTheDocument();

    expect(
      screen.getByText(new RegExp(formatDate(lotteriesDB.drawing.data), 'i'))
    ).toBeInTheDocument();

    expect(
      screen.getByText(/este sorteio é meramente ilustrativo/i)
    ).toBeInTheDocument();
  });

  it('should change lottery and render drawing info', async () => {
    const DRAWING = buildDrawing();
    const SELECTED_OPTION = lotteriesDB.lotteries[2].nome;

    render(<Home />, {
      wrapper: ({ children }) => (
        <ResponsiveContext.Provider value={{ width: 1300 }}>
          {children}
        </ResponsiveContext.Provider>
      )
    });

    await waitForLoadingToBeRemoved();

    server.use(
      rest.get(`${API_URL}/concursos/:id`, (_, res, ctx) => {
        return res.once(ctx.status(200), ctx.json(DRAWING));
      })
    );

    userEvent.selectOptions(
      screen.getByRole('combobox', { name: /escolha a loteria/i }),
      screen.getByRole('option', {
        name: SELECTED_OPTION
      })
    );

    const progressBarEl = screen.getByLabelText(/carregando/i);

    expect(
      await screen.findByText(new RegExp(DRAWING.id, 'i'))
    ).toBeInTheDocument();

    // Progress Bar just unmount on transition end
    // and is not trigger automatically here
    // i am doing manually
    fireEvent.transitionEnd(progressBarEl);
    expect(progressBarEl).not.toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: new RegExp(SELECTED_OPTION, 'i')
      })
    ).toBeInTheDocument();

    DRAWING.numeros.forEach((number) => {
      expect(screen.getByText(String(number))).toBeInTheDocument();
    });

    expect(
      screen.getByText(new RegExp(formatDate(DRAWING.data), 'i'))
    ).toBeInTheDocument();
  });

  it('should render not found error message when does not have a drawing', async () => {
    const ERROR_MESSAGE = 'No Drawing found';

    render(<Home />);

    await waitForLoadingToBeRemoved();

    server.use(
      rest.get(`${API_URL}/concursos/:id`, (_, res, ctx) => {
        return res.once(ctx.status(404), ctx.json({ message: ERROR_MESSAGE }));
      })
    );

    lotteriesDB.drawing.numeros.forEach((number) => {
      expect(screen.getByText(String(number))).toBeInTheDocument();
    });

    userEvent.selectOptions(
      screen.getByRole('combobox', { name: /escolha a loteria/i }),
      screen.getByRole('option', {
        name: lotteriesDB.lotteries[1].nome
      })
    );

    expect(await screen.findByText(/nenhum concurso/gi)).toBeInTheDocument();

    lotteriesDB.drawing.numeros.forEach((number) => {
      expect(screen.queryByText(String(number))).not.toBeInTheDocument();
    });
  });
});
