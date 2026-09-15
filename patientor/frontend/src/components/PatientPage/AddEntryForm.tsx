import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from "@mui/material";
import type { EntryFormValues } from "../../types";
import { HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
}

type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";

const AddEntryForm = ({ onSubmit }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState('');

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState('');

  // OccupationalHealthcare
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStart, setSickLeaveStart] = useState('');
  const [sickLeaveEnd, setSickLeaveEnd] = useState('');

  // Hospital
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const resetCommonFields = () => {
    setDescription('');
    setDate('');
    setSpecialist('');
    setDiagnosisCodes('');
  };

  const parsedDiagnosisCodes = diagnosisCodes
    ? diagnosisCodes.split(',').map(code => code.trim())
    : undefined;

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (type === "HealthCheck") {
      onSubmit({
        type: "HealthCheck",
        description,
        date,
        specialist,
        diagnosisCodes: parsedDiagnosisCodes,
        healthCheckRating: Number(healthCheckRating) as HealthCheckRating
      });
      setHealthCheckRating('');
    } else if (type === "OccupationalHealthcare") {
      onSubmit({
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        diagnosisCodes: parsedDiagnosisCodes,
        employerName,
        sickLeave:
          sickLeaveStart && sickLeaveEnd
            ? { startDate: sickLeaveStart, endDate: sickLeaveEnd }
            : undefined
      });
      setEmployerName('');
      setSickLeaveStart('');
      setSickLeaveEnd('');
    } else {
      onSubmit({
        type: "Hospital",
        description,
        date,
        specialist,
        diagnosisCodes: parsedDiagnosisCodes,
        discharge: {
          date: dischargeDate,
          criteria: dischargeCriteria
        }
      });
      setDischargeDate('');
      setDischargeCriteria('');
    }

    resetCommonFields();
  };

  return (
    <Box sx={{ border: "1px dashed grey", borderRadius: "8px", padding: "1em", marginY: "1em" }}>
      <h3>New entry</h3>
      <FormControl fullWidth sx={{ marginBottom: "0.5em" }}>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          label="Type"
          onChange={(event) => setType(event.target.value as EntryType)}
        >
          <MenuItem value="HealthCheck">Health Check</MenuItem>
          <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
        </Select>
      </FormControl>

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
          label="Diagnosis codes (comma separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={(event) => setDiagnosisCodes(event.target.value)}
          sx={{ marginBottom: "0.5em" }}
        />

        {type === "HealthCheck" && (
          <TextField
            label="Health check rating (0-3)"
            fullWidth
            value={healthCheckRating}
            onChange={(event) => setHealthCheckRating(event.target.value)}
            sx={{ marginBottom: "0.5em" }}
          />
        )}

        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              label="Employer name"
              fullWidth
              value={employerName}
              onChange={(event) => setEmployerName(event.target.value)}
              sx={{ marginBottom: "0.5em" }}
            />
            <TextField
              label="Sick leave start"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveStart}
              onChange={(event) => setSickLeaveStart(event.target.value)}
              sx={{ marginBottom: "0.5em" }}
            />
            <TextField
              label="Sick leave end"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={sickLeaveEnd}
              onChange={(event) => setSickLeaveEnd(event.target.value)}
              sx={{ marginBottom: "0.5em" }}
            />
          </>
        )}

        {type === "Hospital" && (
          <>
            <TextField
              label="Discharge date"
              placeholder="YYYY-MM-DD"
              fullWidth
              value={dischargeDate}
              onChange={(event) => setDischargeDate(event.target.value)}
              sx={{ marginBottom: "0.5em" }}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              value={dischargeCriteria}
              onChange={(event) => setDischargeCriteria(event.target.value)}
              sx={{ marginBottom: "0.5em" }}
            />
          </>
        )}

        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </Box>
  );
};

export default AddEntryForm;