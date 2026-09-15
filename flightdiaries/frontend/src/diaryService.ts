import axios from 'axios';
import type { NonSensitiveDiaryEntry } from './types';

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = () => {
  return axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data);
};

export default { getAll };