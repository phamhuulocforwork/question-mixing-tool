import { QuestionList } from "@/types";

export const initialData: QuestionList = [
  {
    id: crypto.randomUUID(),
    question: "Đâu là thủ đô của Pháp?",
    answerA: "Paris",
    answerB: "London",
    answerC: "Berlin",
    answerD: "Madrid",
    correctAnswer: "A",
  },
];
