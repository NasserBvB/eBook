export interface AnswerArea {
  filled: boolean;
  letter: string;
  indexInAnswer: number;
  currentLetter: string;
  currentIndex: number;
}

export interface Option {
  letter: string;
  index: number;
  choosen: boolean;
}

export interface WordService {
  generateOptions(answer: string): Option[];
  randomizeCharacters(length: number, characters?: string): string;
  generateAnswerArea: (answer: string) => Array<AnswerArea>;
  getLetterIndexesInAnswer(answer: string, letter: string): number[];
}
