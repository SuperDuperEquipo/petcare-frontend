import axiosClient from './axiosClient';
import type { Pet } from '../types';

export interface PetPayload {
  name: string;
  species: string;
  breed?: string;
  birth_date?: string;
  weight?: number;
  photo_url?: string;
}

export const getPets = async (): Promise<Pet[]> => {
  const { data } = await axiosClient.get('/pets');
  return data.mascotas;
};

export const getPet = async (id: number): Promise<Pet> => {
  const { data } = await axiosClient.get(`/pets/${id}`);
  return data.mascota;
};

export const createPet = async (payload: PetPayload): Promise<Pet> => {
  const { data } = await axiosClient.post('/pets', payload);
  return data.mascota;
};

export const updatePet = async (id: number, payload: Partial<PetPayload>): Promise<Pet> => {
  const { data } = await axiosClient.put(`/pets/${id}`, payload);
  return data.mascota;
};

export const deletePet = async (id: number): Promise<void> => {
  await axiosClient.delete(`/pets/${id}`);
};

export const assignPetToOwner = async (petId: number, ownerId: number) => {
  const { data } = await axiosClient.post(`/pets/${petId}/owners/${ownerId}`);
  return data;
};