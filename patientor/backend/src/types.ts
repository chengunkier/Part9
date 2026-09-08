export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const;

export type Gender = typeof Gender[keyof typeof Gender];

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export interface NonSensitivePatient {
  id: string;
  name: string;
  occupation: string;
  gender: string;
  dateOfBirth?: string;
}

export type NewPatientEntry = Omit<Patient, 'id'>;

export type PatientFormValues = Omit<Patient, "id" | "entries">;