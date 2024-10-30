// Interface para representar una visita médica
interface patientId{
    id:number;
}

export interface Visit {
    id: number;
    date: string; // Representación de LocalDate en formato string (e.g., 'YYYY-MM-DD')
    description: string;
    treatment: string;
    patient: patientId; 
}
  

  