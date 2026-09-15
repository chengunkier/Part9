import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import { Patient } from "../../types";
import patientService from "../../services/patients";

const EntryDetails = ({ entry }: { entry: Patient['entries'][number] }) => {
  return (
    <div style={{ border: "1px solid black", borderRadius: "8px", padding: "8px", marginBottom: "8px" }}>
      <div>{entry.date} <em>{entry.description}</em></div>
      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map(code => (
            <li key={code}>{code}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const PatientPage = () => {
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
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientPage;