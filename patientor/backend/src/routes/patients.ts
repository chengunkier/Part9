import express, { type Response } from 'express';
import { z } from 'zod';
import patientService from '../services/patientService.ts';
import { NewPatientSchema, NewEntrySchema } from '../types.ts';
import type { NonSensitivePatient, Patient, Entry } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res: Response<Patient | { error: string }>) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send({ error: 'Patient not found' });
  }
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

router.post('/:id/entries', (req, res: Response<Entry | { error: unknown }>) => {
  try {
    const newEntry = NewEntrySchema.parse(req.body);
    const addedEntry = patientService.addEntry(req.params.id, newEntry);

    if (!addedEntry) {
      res.status(404).send({ error: 'Patient not found' });
      return;
    }

    res.json(addedEntry);
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      res.status(400).send({ error: error.issues });
    } else {
      res.status(400).send({ error: 'unknown error' });
    }
  }
});

export default router;