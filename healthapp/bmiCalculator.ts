interface BmiValues {
    height: number;
    weight: number;
  }
  
  const parseArguments = (height: number, weight: number): BmiValues => {
    if (isNaN(height) || isNaN(weight)) {
      throw new Error('Provided values were not numbers!');
    }
  
    return {
      height,
      weight
    };
  };
  
  const calculateBmi = (height: number, weight: number): string => {
    const { height: h, weight: w } = parseArguments(height, weight);
  
    const heightInMeters = h / 100;
    const bmi = w / (heightInMeters * heightInMeters);
  
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi < 25) {
      return 'Normal range';
    } else if (bmi < 30) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  };
  
  console.log(calculateBmi(180, 74));