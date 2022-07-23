import { MMKV } from 'react-native-mmkv';
import { Question } from '../../../types/Questions';

const QUESTIONS_KEY = 'questions';
const CURRENT_QUESTION = 'current_question';
const COINS_KEY = 'coins';
const storage = new MMKV();

export type TokenType = {
  access: string;
  refresh: string;
};

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  return value ? JSON.parse(value) || null : null;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}
export async function removeItem(key: string) {
  storage.delete(key);
}

export const getQuestions = () => getItem<Question[]>(QUESTIONS_KEY) || [];
export const removeQuestions = () => removeItem(QUESTIONS_KEY);
export const setQuestions = (value: Question[]) =>
  setItem<Question[]>(QUESTIONS_KEY, value);

export const getCurrentQuestion = () => getItem<Question>(CURRENT_QUESTION);
export const setCurrentQuestion = (value: Question) =>
  setItem<Question>(CURRENT_QUESTION, value);
export const removeCurrentQuestion = () => removeItem(CURRENT_QUESTION);

export const getCoins = () => getItem<number>(COINS_KEY) || 0;
export const setCoins = (value: number) => setItem<number>(COINS_KEY, value);
export const removeCoins = () => removeItem(COINS_KEY);
