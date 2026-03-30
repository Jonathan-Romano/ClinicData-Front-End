import { Visit } from "./visit";

  // Interface para representar al paciente
  export interface Patient {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    address: string;
    phone: number;
    dni: number;
    visits: Visit[]; // Lista de visitas asociadas al paciente
  }
