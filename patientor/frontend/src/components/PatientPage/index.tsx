import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import axios from "axios";

import { Patient, Diagnosis } from "../../types";
import type { EntryFormValues } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntryForm";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const data = await patientService.getById(id);
        setPatient(data);
      };
      void fetchPatient();
    }
  }, [id]);

  if (!patient) {
    return <div>loading...</div>;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!id) return;

    try {
      const newEntry = await patientService.createEntry(id, values);
      setPatient({ ...patient, entries: patient.entries.concat(newEntry) });
      setError(null);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e.response && e.response.data && typeof e.response.data === "object" && "error" in e.response.data) {
          setError(JSON.stringify(e.response.data.error));
        } else {
          setError("Something went wrong");
        }
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div>
      <Typography variant="h5" sx={{ marginTop: "1em" }}>
        {patient.name}
      </Typography>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

      {error && (
        <div style={{ color: "red", border: "1px solid red", padding: "0.5em", marginTop: "1em" }}>
          {error}
        </div>
      )}

      <AddEntryForm onSubmit={submitNewEntry} />

      <Typography variant="h6" sx={{ marginTop: "1em" }}>
        entries
      </Typography>
      {patient.entries.length === 0 && <div>No entries</div>}
      {patient.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;