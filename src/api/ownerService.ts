import axiosClient from './axiosClient';

export interface Owner {
  id: number;
  nombre: string;
  telefono: string;
  direccion: string;
}

export interface OwnerPayload {
  name: string;
  phone: string;
  address: string;
}

export const getOwnerById = async (id: number): Promise<Owner> => {
  const { data } = await axiosClient.get(`/owners/${id}`);
  return data;
};

export const createOwner = async (payload: OwnerPayload): Promise<Owner> => {
  const { data } = await axiosClient.post('/owners', payload);
  return data;
};

export const updateOwnerById = async (id: number, payload: OwnerPayload): Promise<Owner> => {
  const { data } = await axiosClient.put(`/owners/${id}`, payload);
  return data;
};