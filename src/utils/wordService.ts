import axios from 'axios';
import { Question } from '../../types/Questions';
import { Option, WordService } from '../../types/WordService';
import data from './data.json';
function randomizeCharacters(
  length: number,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
) {
  let result = '';
  const listChars = [...characters.split('')];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * listChars.length);
    result += listChars[randomIndex];
    listChars.splice(randomIndex, 1);
  }
  return result;
}

export const generateOptions = (answer: string): Option[] => {
  const length = answer.length;

  const complementaryLetters =
    answer + randomizeCharacters(Math.floor((length * 5) / 3) - length);

  const filledIndexes: Record<string, number[]> = {};

  return randomizeCharacters(Math.floor((length * 5) / 3), complementaryLetters)
    .split('')
    .map(letter => {
      const indexes = getLetterIndexesInAnswer(answer, letter);

      if (indexes.length > 0) {
        if (filledIndexes[letter]?.length) {
          let position = 0;
          let correctIndex = indexes[position];
          while (filledIndexes[letter].includes(correctIndex)) {
            position += 1;
            correctIndex = indexes[position];
          }

          filledIndexes[letter].push(correctIndex);

          return {
            letter,
            index: correctIndex,
            choosen: false,
          };
        }
        filledIndexes[letter] = [indexes[0]];
        return {
          letter,
          index: indexes[0],
          choosen: false,
        };
      }
      return {
        index: -1,
        letter,
        choosen: false,
      };
    });
};

const generateAnswerArea = (answer: string) => {
  const result: any[] = [];
  for (let i = 0; i < answer.length; i++) {
    result.push({
      filled: false,
      letter: answer[i],
      indexInAnswer: i,
      currentLetter: '',
      currentIndex: -1,
    });
  }
  return result;
};

const getLetterIndexesInAnswer = (answer: string, letter: string) => {
  const result: number[] = [];
  for (let i = 0; i < answer.length; i++) {
    if (answer[i] === letter) {
      result.push(i);
    }
  }
  return result;
};

const wordService: WordService = {
  randomizeCharacters,
  generateAnswerArea,
  generateOptions,
  getLetterIndexesInAnswer,
};

export default wordService;

export const generateRandomQuestions = async () => {
  const questions: Question[] = [];
  let i = 1;
  const results = data.Results as any;
  for (const code in results) {
    if (Object.prototype.hasOwnProperty.call(results, code)) {
      const { Name } = results[code];

      if (Name.includes(' ')) {
        continue;
      }

      const image = `https://flagcdn.com/108x81/${code.toLowerCase()}.png`;

      questions.push({
        id: `${new Date().getTime()}q-${i}`,
        ordre: i,
        type: 'type',
        question: 'Guess country ?',
        assets: [image],
        answer: Name.toUpperCase(),
      });
      i++;
    }
  }

  return questions;
};
