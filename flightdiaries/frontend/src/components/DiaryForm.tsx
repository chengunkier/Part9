import { useState } from 'react';
import { Weather, Visibility } from '../types';
import type { NewDiaryEntry } from '../types';

interface DiaryFormProps {
  createDiary: (diary: NewDiaryEntry) => void;
}

const DiaryForm = ({ createDiary }: DiaryFormProps) => {
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    createDiary({ date, weather, visibility, comment });

    setDate('');
    setWeather(Weather.Sunny);
    setVisibility(Visibility.Great);
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={addDiary}>
        <div>
          date{' '}
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <fieldset>
          <legend>visibility</legend>
          {Object.values(Visibility).map((value) => (
            <label key={value} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="visibility"
                value={value}
                checked={visibility === value}
                onChange={() => setVisibility(value)}
              />
              {value}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>weather</legend>
          {Object.values(Weather).map((value) => (
            <label key={value} style={{ marginRight: '10px' }}>
              <input
                type="radio"
                name="weather"
                value={value}
                checked={weather === value}
                onChange={() => setWeather(value)}
              />
              {value}
            </label>
          ))}
        </fieldset>

        <div>
          comment{' '}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default DiaryForm;