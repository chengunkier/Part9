import { useState, useEffect } from 'react';
import type { NonSensitiveDiaryEntry } from './types';
import { Weather, Visibility } from './types';
import diaryService from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data);
    });
  }, []);

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    diaryService
      .create({ date, weather, visibility, comment })
      .then(newDiary => {
        setDiaries(diaries.concat(newDiary));
        setDate('');
        setWeather(Weather.Sunny);
        setVisibility(Visibility.Great);
        setComment('');
      });
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
        <div>
          visibility{' '}
          {Object.values(Visibility).map((value) => (
            <label key={value}>
              {value}
              <input
                type="radio"
                name="visibility"
                value={value}
                checked={visibility === value}
                onChange={() => setVisibility(value)}
              />
            </label>
          ))}
        </div>
        <div>
          weather{' '}
          {Object.values(Weather).map((value) => (
            <label key={value}>
              {value}
              <input
                type="radio"
                name="weather"
                value={value}
                checked={weather === value}
                onChange={() => setWeather(value)}
              />
            </label>
          ))}
        </div>
        <div>
          comment{' '}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>

      <h2>Flight diary entries</h2>
      {diaries.map(diary => (
        <div key={diary.id}>
          <h3>{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default App;