import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const heightNumber = Number(height);
  const weightNumber = Number(weight);

  if (isNaN(heightNumber) || isNaN(weightNumber)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const bmi = calculateBmi(heightNumber, weightNumber);

  res.json({
    weight: weightNumber,
    height: heightNumber,
    bmi
  });
});

interface ExercisesBody {
  daily_exercises: unknown;
  target: unknown;
}

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExercisesBody;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (!Array.isArray(daily_exercises)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  if (isNaN(Number(target))) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const dailyExerciseNumbers: number[] = daily_exercises.map((hour: unknown) => Number(hour));

  if (dailyExerciseNumbers.some((hour) => isNaN(hour))) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const result = calculateExercises(dailyExerciseNumbers, Number(target));

  res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});