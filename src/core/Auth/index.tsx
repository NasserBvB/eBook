/// Auth.tsx
import { RewardedAd, TestIds } from 'react-native-google-mobile-ads';
import { generateRandomQuestions } from 'utils/wordService';
import create from 'zustand';
import { Question } from '../../../types/Questions';
import {
  getCoins,
  getCurrentQuestion,
  getQuestions,
  setCoins,
  // removeCurrentQuestion,
  // removeQuestions,
  setCurrentQuestion,
  setQuestions,
} from './utils';
const adUnitId = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-6750790982638800/3557862551';
interface AuthState {
  questions: Question[];
  currentQuestion: Question | null;
  status: 'idle' | 'signOut' | 'signIn';
  coins: number;
  hydrate: () => void;
  nextQuestion: () => void;
  addCoins: (coins: number) => void;
  removeCoins: (coins: number) => void;
  rewardedAd: RewardedAd | null;
  showAdModal: boolean;
  showAd: (show: boolean) => void;
}
const fetchQuestions = async () => {
  // @todo: Fetch questions from API
  // For now, we'll just return a mock list of questions
  return generateRandomQuestions();
};

const initAds = async () => {
  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
    keywords: ['fashion', 'clothing'],
  });

  return rewarded;
};

export const useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  questions: [],
  currentQuestion: null,
  coins: 50,
  rewardedAd: null,
  showAdModal: false,
  showAd: (show: boolean) => set(state => ({ ...state, showAdModal: show })),
  hydrate: async () => {
    let questions: Question[];
    let currentQuestion: Question | null;
    let coins: number;
    // removeQuestions();
    // removeCurrentQuestion();
    // removeCoins();

    const rewardedAd = await initAds();

    try {
      coins = getCoins();

      if (coins === 0) {
        throw new Error('No coins');
      }
    } catch (error) {
      coins = 50;
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

    set({
      ...get(),
      questions,
      currentQuestion,
      status: 'signIn',
      coins,
      rewardedAd,
    });
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
