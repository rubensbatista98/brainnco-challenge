const API_URL = process.env.REACT_APP_API_URL;

async function api<Response>(endpoint?: string) {
  const response = await fetch(`${API_URL}${endpoint}`);
  const data: Response = await response.json();

  if (!response.ok) {
    return Promise.reject({ status: response.status, ...data });
  }

  return data;
}

export { api };
