import { v1 as uuid } from 'uuid';
import patientsData from '../../data/patients.ts';
import type { NonSensitivePatient, NewPatientEntry, Patient } from '../types.ts';

const patients: Patient[] = (patientsData as Omit<Patient, 'entries'>[]).map((patient) => ({
  ...patient,
  entries: []
}));

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const findById = (id: string): Patient | undefined => {
  return patients.find(p => p.id === id);
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient: Patient = {
    id: uuid(),
    ...entry,
    entries: []
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitiveEntries,
  findById,
  addPatient
};