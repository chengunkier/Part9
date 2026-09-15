import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import type { EntryFormValues } from "../../types";
import { HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

const AddEntryForm = ({ onSubmit }: Props) => {
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [healthCheckRating, setHealthCheckRating] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    onSubmit({
      type: "HealthCheck",
      description,
      date,
      specialist,
      healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
      diagnosisCodes: diagnosisCodes
        ? diagnosisCodes.split(',').map(code => code.trim())
        : undefined
    });

    setDescription('');
    setDate('');
    setSpecialist('');
    setHealthCheckRating('');
    setDiagnosisCodes('');
  };

  return (
    <Box sx={{ border: "1px dashed grey", borderRadius: "8px", padding: "1em", marginY: "1em" }}>
      <h3>New HealthCheck entry</h3>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          sx={{ marginBottom: "0.5em" }}
        />
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth
          value={date}
          onChange={(event) => setDate(event.target.value)}
          sx={{ marginBottom: "0.5em" }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={(event) => setSpecialist(event.target.value)}
          sx={{ marginBottom: "0.5em" }}
        />
        <TextField
          label="Health check rating (0-3)"
          fullWidth
          value={healthCheckRating}
          onChange={(event) => setHealthCheckRating(event.target.value)}
          sx={{ marginBottom: "0.5em" }}
        />
        <TextField
          label="Diagnosis codes (comma separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={(event) => setDiagnosisCodes(event.target.value)}
          sx={{ marginBottom: "0.5em" }}
        />
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AddEntryForm;