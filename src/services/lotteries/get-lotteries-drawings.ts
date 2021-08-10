import { api } from './api';

type LotteriesDrawings = {
  lotteryId: number;
  drawingId: string;
};

type ApiData = {
  loteriaId: number;
  concursoId: string;
};

async function getLotteriesDrawings() {
  try {
    const data = await api<ApiData[]>('/loterias-concursos');

    const lotteriesDrawings: LotteriesDrawings[] = data.map((ld) => ({
      drawingId: ld.concursoId,
      lotteryId: ld.loteriaId
    }));

    return lotteriesDrawings;
  } catch (error) {
    return Promise.reject({
      message:
        'Desculpa, tivemos um erro inesperado. Tente novamente mais tarde.'
    });
  }
}

export { getLotteriesDrawings };
