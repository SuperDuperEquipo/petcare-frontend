import axiosClient from './axiosClient';

export type AppointmentStatus = 'pendiente' | 'confirmada' | 'cancelada';

export interface Appointment {
  id: number;
  fecha: string;
  hora: string;
  titulo: string;
  descripcion: string;
  tipo: string;
  id_mascota: number;
  mascota_nombre?: string;
  estado: AppointmentStatus;
}

export const getAppointments = async (): Promise<Appointment[]> => {
  const { data } = await axiosClient.get('/appointments');
  return data.citas; 
};

export const getAppointment = async (id: number): Promise<Appointment> => {
  const { data } = await axiosClient.get(`/appointments/${id}`);
  return data.cita;
};

export const createAppointment = async (payload: any) => {
  const { data } = await axiosClient.post('/appointments', payload);
  return data.cita;
};

export const updateAppointment = async (id: number, payload: any) => {
  const { data } = await axiosClient.put(`/appointments/${id}`, payload);
  return data.cita;
};

export const deleteAppointment = async (id: number) => {
  await axiosClient.delete(`/appointments/${id}`);
};