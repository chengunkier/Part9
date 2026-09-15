import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";

import { Patient } from "../../types";
import patientService from "../../services/patients";

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
    </div>
  );
};

export default PatientPage;