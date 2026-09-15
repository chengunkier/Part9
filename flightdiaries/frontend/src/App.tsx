import { useState, useEffect } from 'react';
import axios from 'axios';
import type { NonSensitiveDiaryEntry, NewDiaryEntry } from './types';
import diaryService from './diaryService';
import Notification from './components/Notification';
import DiaryForm from './components/DiaryForm';
import DiaryList from './components/DiaryList';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
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

  const createDiary = (newDiary: NewDiaryEntry) => {
    diaryService
      .create(newDiary)
      .then(returnedDiary => {
        setDiaries(diaries.concat(returnedDiary));
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
      <DiaryForm createDiary={createDiary} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;