import { List, ListItem, Typography } from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  Entry,
  HealthCheckRating,
  Diagnosis
} from "../../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthRatingIcon = ({ rating }: { rating: HealthCheckRating }) => {
  switch (rating) {
    case HealthCheckRating.Healthy:
      return <FavoriteIcon style={{ color: "green" }} />;
    case HealthCheckRating.LowRisk:
      return <FavoriteIcon style={{ color: "yellow" }} />;
    case HealthCheckRating.HighRisk:
      return <FavoriteIcon style={{ color: "orange" }} />;
    case HealthCheckRating.CriticalRisk:
      return <FavoriteBorderIcon style={{ color: "red" }} />;
    default:
      return assertNever(rating);
  }
};

const DiagnosisList = ({
  codes,
  diagnoses
}: {
  codes?: Array<Diagnosis['code']>;
  diagnoses: Diagnosis[];
}) => {
  if (!codes) {
    return null;
  }

  return (
    <List sx={{ listStyleType: "disc", pl: 2 }}>
      {codes.map(code => {
        const diagnosis = diagnoses.find(d => d.code === code);
        return (
          <ListItem key={code} sx={{ display: "list-item", padding: 0 }}>
            {code} {diagnosis ? diagnosis.name : ''}
          </ListItem>
        );
      })}
    </List>
  );
};

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const EntryDetails = ({ entry, diagnoses }: Props) => {
  const containerStyle = {
    border: "1px solid black",
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "8px"
  };

  switch (entry.type) {
    case "Hospital":
      return (
        <div style={containerStyle}>
          <Typography>
            {entry.date} <LocalHospitalIcon />
          </Typography>
          <Typography><em>{entry.description}</em></Typography>
          <div>discharge: {entry.discharge.date}, {entry.discharge.criteria}</div>
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          <div>diagnose by {entry.specialist}</div>
        </div>
      );
    case "OccupationalHealthcare":
      return (
        <div style={containerStyle}>
          <Typography>
            {entry.date} <WorkIcon /> {entry.employerName}
          </Typography>
          <Typography><em>{entry.description}</em></Typography>
          {entry.sickLeave && (
            <div>
              sick leave: {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
            </div>
          )}
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          <div>diagnose by {entry.specialist}</div>
        </div>
      );
    case "HealthCheck":
      return (
        <div style={containerStyle}>
          <Typography>
            {entry.date} <MedicalServicesIcon />
          </Typography>
          <Typography><em>{entry.description}</em></Typography>
          <HealthRatingIcon rating={entry.healthCheckRating} />
          <DiagnosisList codes={entry.diagnosisCodes} diagnoses={diagnoses} />
          <div>diagnose by {entry.specialist}</div>
        </div>
      );
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;