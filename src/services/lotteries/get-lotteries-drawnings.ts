import { api } from './api';

type LotteriesDrawnings = {
  lotteryId: number;
  drawningId: string;
};

type ApiData = {
  loteriaId: number;
  concursoId: string;
};

async function getLotteriesDrawnings() {
  try {
    const data = await api<ApiData[]>('/loterias-concursos');

    const lotteriesDrawnings: LotteriesDrawnings[] = data.map((ld) => ({
      drawningId: ld.concursoId,
      lotteryId: ld.loteriaId
    }));

    return lotteriesDrawnings;
  } catch (error) {
    return Promise.reject({
      message:
        'Desculpa, tivemos um erro inesperado. Tente novamente mais tarde.'
    });
  }
}

export { getLotteriesDrawnings };
