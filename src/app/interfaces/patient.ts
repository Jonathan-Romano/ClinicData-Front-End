import { Visit } from "./visit";

  // Interface para representar al paciente
  export interface Patient {
    id?: number;
    name: string;
    lastName: string;
    email: string;
    phone: number;
    dni: number;
    visitList: Visit[]; // Lista de visitas asociadas al paciente
  }