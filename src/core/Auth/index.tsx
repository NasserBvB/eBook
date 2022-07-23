/// Auth.tsx
import { generateRandomQuestions } from 'utils/wordService';
import create from 'zustand';
import { Question } from '../../../types/Questions';
import {
  getCoins,
  getCurrentQuestion,
  getQuestions,
  removeCoins,
  removeCurrentQuestion,
  removeQuestions,
  setCoins,
  // removeCurrentQuestion,
  // removeQuestions,
  setCurrentQuestion,
  setQuestions,
} from './utils';
interface AuthState {
  questions: Question[];
  currentQuestion: Question | null;
  status: 'idle' | 'signOut' | 'signIn';
  coins: number;
  hydrate: () => void;
  nextQuestion: () => void;
  addCoins: (coins: number) => void;
  removeCoins: (coins: number) => void;
}
const fetchQuestions = async () => {
  // @todo: Fetch questions from API
  // For now, we'll just return a mock list of questions
  return generateRandomQuestions();
};

export const useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  questions: [],
  currentQuestion: null,
  coins: 10,
  hydrate: async () => {
    let questions: Question[];
    let currentQuestion: Question | null;
    let coins: number;
    removeQuestions();
    removeCurrentQuestion();
    removeCoins();

    try {
      coins = getCoins();

      if (coins === 0) {
        throw new Error('No coins');
      }
    } catch (error) {
      coins = 10;
    }

    try {
      questions = getQuestions();

      if (questions.length === 0) {
        throw new Error('No questions found');
      }
    } catch (error) {
      questions = await fetchQuestions();
    }

    try {
      currentQuestion = getCurrentQuestion();

      if (!currentQuestion) {
        throw new Error('No current question found');
      }
    } catch (error) {
      currentQuestion = questions[0];
    }

    setQuestions(questions);
    setCurrentQuestion(currentQuestion);

    set({ ...get(), questions, currentQuestion, status: 'signIn', coins });
  },
  addCoins: (coins: number) => {
    set({ ...get(), coins: get().coins + coins });
    setCoins(get().coins + coins);
  },
  removeCoins: (coins: number) => {
    const newAmount = get().coins - coins > 0 ? get().coins - coins : 0;

    set({ ...get(), coins: newAmount });
    setCoins(newAmount);
  },
  nextQuestion: () => {
    const questions = getQuestions();
    const currentQuestion = getCurrentQuestion();
    let nextQuestion = questions[0];
    if (currentQuestion) {
      const index = questions.findIndex(cur => cur.id === currentQuestion.id);
      nextQuestion = questions[index + 1];
    }
    set({ ...get(), currentQuestion: nextQuestion });

    setCurrentQuestion(nextQuestion);
  },
}));

export const hydrateAuth = () => useAuth.getState().hydrate();
