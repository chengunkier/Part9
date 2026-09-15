import { useState, useEffect } from 'react';
import axios from 'axios';
import type { NonSensitiveDiaryEntry } from './types';
import { Weather, Visibility } from './types';
import diaryService from './diaryService';
import Notification from './components/Notification';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    diaryService.getAll().then(data => {
      setDiaries(data);
    });
  }, []);

  const notify = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

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
      })
      .catch(error => {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.data) {
            const data: unknown = error.response.data;
            if (typeof data === 'string') {
              notify(data);
            } else if (
              typeof data === 'object' &&
              data !== null &&
              'error' in data
            ) {
              notify(JSON.stringify((data as { error: unknown }).error));
            } else {
              notify('Something went wrong');
            }
          } else {
            notify('Something went wrong');
          }
        } else {
          notify('Unknown error');
        }
      });
  };

  return (
    <div>
      <Notification message={errorMessage} />

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