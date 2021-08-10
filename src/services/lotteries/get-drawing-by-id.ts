import { Drawing } from 'types/Drawing';

import { api } from './api';

type ApiData = {
  id: string;
  loteria: number;
  numeros: Array<string>;
  data: string;
};

async function getDrawingById(id: string | number) {
  try {
    const data = await api<ApiData>(`/concursos/${id}`);

    return {
      id: data.id,
      lottery: data.loteria,
      numbers: data.numeros,
      date: data.data
    } as Drawing;
  } catch (error) {
    const message =
      error.status === 404
        ? 'Não possui nenhum concurso para esta loteria no momento.'
        : 'Desculpa, tivemos um erro inesperado. Tente novamente mais tarde.';

    return Promise.reject({ message });
  }
}

export { getDrawingById };
