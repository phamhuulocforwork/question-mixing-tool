export type Quiz = {
  id: string;
  question: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: string;
};

export type QuizList = Quiz[];
