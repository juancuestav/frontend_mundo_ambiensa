/* eslint-disable @typescript-eslint/no-explicit-any */
import api from './api';

export const getClientes = () => {
  return api.get('/clientes');
};

export const addCliente = (cliente: any) => {
  return api.post('/clientes', cliente);
};

export const updateCliente = (id: number, cliente: any) => {
  return api.put(`/clientes/${id}`, cliente);
};

export const deleteCliente = (id: number) => {
  return api.delete(`/clientes/${id}`);
};

export const filtrar = (params: string) => {
  return api.get('/clientes?' + params);
};
