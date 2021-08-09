import type { Lottery } from 'types/Lottery';

import { api } from './api';

type ApiData = {
  id: number;
  nome: string;
};

async function getLotteries() {
  try {
    const data = await api<ApiData[]>('/loterias');

    const lotteries: Lottery[] = data.map((lottery) => ({
      id: lottery.id,
      name: lottery.nome
    }));

    return lotteries;
  } catch (error) {
    return Promise.reject({
      message:
        'Desculpa, tivemos um erro inesperado. Tente novamente mais tarde.'
    });
  }
}

export { getLotteries };
