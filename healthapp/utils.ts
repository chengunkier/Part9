export const isNotNumber = (argument: string): boolean =>
    isNaN(Number(argument));
  
  interface BmiValues {
    height: number;
    weight: number;
  }
  
  export const parseBmiArguments = (args: string[]): BmiValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      };
    } else {
      throw new Error('Provided values were not numbers!');
    }
  };
  
  interface ExerciseValues {
    target: number;
    dailyHours: number[];
  }
  
  export const parseExerciseArguments = (args: string[]): ExerciseValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
  
    const values = args.slice(2);
  
    if (values.some((value) => isNotNumber(value))) {
      throw new Error('Provided values were not numbers!');
    }
  
    const numbers = values.map((value) => Number(value));
    const [target, ...dailyHours] = numbers;
  
    return {
      target,
      dailyHours
    };
  };