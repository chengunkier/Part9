import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  type SelectChangeEvent
} from "@mui/material";
import type { Diagnosis, EntryFormValues } from "../../types";
import { HealthCheckRating } from "../../types";

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

type EntryType = "HealthCheck" | "OccupationalHealthcare" | "Hospital";

const healthCheckRatingOptions = [
  { value: HealthCheckRating.Healthy, label: "Healthy" },
  { value: HealthCheckRating.LowRisk, label: "Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "Critical Risk" }
];

const AddEntryForm = ({ onSubmit, diagnoses }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  // HealthCheck
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);

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
    setDiagnosisCodes([]);
  };

  const handleDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const addEntry = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const codes = diagnosisCodes.length > 0 ? diagnosisCodes : undefined;

    if (type === "HealthCheck") {
      onSubmit({
        type: "HealthCheck",
        description,
        date,
        specialist,
        diagnosisCodes: codes,
        healthCheckRating
      });
      setHealthCheckRating(HealthCheckRating.Healthy);
    } else if (type === "OccupationalHealthcare") {
      onSubmit({
        type: "OccupationalHealthcare",
        description,
        date,
        specialist,
        diagnosisCodes: codes,
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
        diagnosisCodes: codes,
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
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
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

        <FormControl fullWidth sx={{ marginBottom: "0.5em" }}>
          <InputLabel>Diagnosis codes</InputLabel>
          <Select
            multiple
            value={diagnosisCodes}
            onChange={handleDiagnosisCodesChange}
            label="Diagnosis codes"
            renderValue={(selected) => selected.join(', ')}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                <Checkbox checked={diagnosisCodes.includes(diagnosis.code)} />
                <ListItemText primary={`${diagnosis.code} ${diagnosis.name}`} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {type === "HealthCheck" && (
          <FormControl fullWidth sx={{ marginBottom: "0.5em" }}>
            <InputLabel>Health check rating</InputLabel>
            <Select
              value={healthCheckRating}
              label="Health check rating"
              onChange={(event) => setHealthCheckRating(Number(event.target.value) as HealthCheckRating)}
            >
              {healthCheckRatingOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              value={sickLeaveStart}
              onChange={(event) => setSickLeaveStart(event.target.value)}
              sx={{ marginBottom: "0.5em" }}
            />
            <TextField
              label="Sick leave end"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
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
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
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