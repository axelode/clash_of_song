export interface IAvatar {
  id: number;
  ava: string;
  isPremium: boolean;
  price: number;
}

interface IDiamond {
  id: number;
  attachment: string;
  value: number;
  price: number;
}

interface IAnswer {
  id: string;
  content: string;
  isCorrect: boolean;
  quizId: string;
}

interface IQuiz {
  id: string;
  score: number;
  question: string;
  timer: number;
  answers: IAnswer[];
}
