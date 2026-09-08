import express, { type Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService.ts';
import { NewPatientSchema } from '../types.ts';
import type { NonSensitivePatient, Patient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res: Response<Patient | { error: unknown }>) => {
  try {
    const newPatientEntry = NewPatientSchema.parse(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;