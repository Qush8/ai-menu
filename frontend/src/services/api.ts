const baseURL =
  import.meta.env.VITE_API_URL ?? (typeof window !== 'undefined' ? '' : 'http://localhost:5001');

import axios from 'axios';

export const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

export interface HelloResponse {
  message: string;
}

export const getHello = async (): Promise<HelloResponse> => {
  const { data } = await api.get<HelloResponse>('/api/hello');
  return data;
};
