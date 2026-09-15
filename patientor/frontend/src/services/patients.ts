import axios from "axios";
import type { Patient, PatientFormValues } from "../types";

const apiBaseUrl = "http://localhost:3001/api";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );
  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );
  return data;
};

export default {
  getAll,
  getById,
  create
};