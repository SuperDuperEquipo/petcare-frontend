import axiosClient from './axiosClient'

export interface Vaccine {
  id: number
  name: string
  date_applied: string
  next_dose: string | null
  vet: string
  pet_id: number
  created_at: string
}

export interface VaccinePayload {
  name: string
  vet: string
  next_dose: string | null
}

export const getVaccinesByPet = async (petId: number): Promise<Vaccine[]> => {
  const { data } = await axiosClient.get(`/pets/${petId}/vaccines`)
  return data.vacunas
}

export const getVaccine = async (id: number): Promise<Vaccine> => {
  const { data } = await axiosClient.get(`/vaccines/${id}`)
  return data.vacuna
}

export const createVaccine = async (petId: number, payload: VaccinePayload): Promise<Vaccine> => {
  const { data } = await axiosClient.post(`/pets/${petId}/vaccines`, payload)
  return data.vacuna
}

export const updateVaccine = async (id: number, payload: Partial<VaccinePayload>): Promise<Vaccine> => {
  const { data } = await axiosClient.put(`/vaccines/${id}`, payload)
  return data.vacuna
}

export const deleteVaccine = async (id: number): Promise<void> => {
  await axiosClient.delete(`/vaccines/${id}`)
}