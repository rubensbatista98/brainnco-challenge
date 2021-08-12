import { api } from './api';

type ApiData = {
  id: number;
  nome: string;
};

type Lottery = {
  id: number;
  name: string;
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

export type { Lottery };
export { getLotteries };
