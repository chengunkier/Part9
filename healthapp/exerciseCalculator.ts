interface ExerciseValues {
    target: number;
    dailyHours: number[];
  }
  
  interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  const parseArguments = (target: number, dailyHours: number[]): ExerciseValues => {
    if (isNaN(target)) {
      throw new Error('Target was not a number!');
    }
  
    if (dailyHours.some((hour) => isNaN(hour))) {
      throw new Error('Daily hours must all be numbers!');
    }
  
    return {
      target,
      dailyHours
    };
  };
  
  const calculateExercises = (dailyHours: number[], target: number): Result => {
    const { target: parsedTarget, dailyHours: parsedHours } = parseArguments(target, dailyHours);
  
    const periodLength = parsedHours.length;
    const trainingDays = parsedHours.filter((hour) => hour > 0).length;
  
    const totalHours = parsedHours.reduce((sum, hour) => sum + hour, 0);
    const average = totalHours / periodLength;
  
    const success = average >= parsedTarget;
  
    let rating: number;
    let ratingDescription: string;
  
    if (average >= parsedTarget) {
      rating = 3;
      ratingDescription = 'great job, target reached';
    } else if (average >= parsedTarget * 0.75) {
      rating = 2;
      ratingDescription = 'not too bad but could be better';
    } else {
      rating = 1;
      ratingDescription = 'you need to work harder to reach your goal';
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target: parsedTarget,
      average
    };
  };
  
  console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
  
  export {};