export type DataConfig = typeof dataConfig;

export const dataConfig = {
  quiz: [
    {
      id: crypto.randomUUID(),
      question: "Đâu là thủ đô của Pháp?",
      answerA: "Paris",
      answerB: "London",
      answerC: "Berlin",
      answerD: "Madrid",
      correctAnswer: "A",
    },
  ],
};
