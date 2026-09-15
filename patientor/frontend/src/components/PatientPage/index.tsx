import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import EntryDetails from "./EntryDetails";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientPage = ({ diagnoses }: Props) => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);

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

  return (
    <div>
      <Typography variant="h5" sx={{ marginTop: "1em" }}>
        {patient.name}
      </Typography>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>

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