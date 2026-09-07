import patients from '../../data/patients.ts';
import type { Patient, NonSensitivePatient, Gender } from '../types.ts';

const getEntries = (): Patient[] => {
  return patients as Patient[];
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender: gender as Gender,
    occupation
  }));
};

export default {
  getEntries,
  getNonSensitiveEntries
};