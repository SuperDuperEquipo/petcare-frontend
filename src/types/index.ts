export interface User {
    id: number;
    name: string;
    email: string;
    role: 'user' | 'owner' | 'admin';
    is_active: boolean;
    created_at: string;
}
 

export interface Pet {
    id: number;
    nombre: string;
    especie: string;
    raza?: string;
    fecha_nacimiento?: string;
    peso?: number;
    foto_url?: string;
}

export interface Vaccine {
    id: number;
    name: string;
    date_applied: string;
    next_dose?: string;
    vet: string;
    pet_id: number;
}

export interface Appointment {
    id: number;
    titulo: string;
    fecha: string;
    hora: string;
    tipo: string;
    descripcion?: string;
    id_mascota: number;
}

export interface Owner {
    id: number;
    nombre: string;
    contacto: string;
    dirección: string;
    user_id: number;
    pets: Pick<Pet, 'id' | 'nombre'>[];
}

export interface Tip {
    id: number;
    titulo: string;
    contenido: string;
    especie: string;
    categoria: string;
}