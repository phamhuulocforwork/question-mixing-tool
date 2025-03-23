import { QuestionList } from "@/types";

export const initialData: QuestionList = [
  {
    id: crypto.randomUUID(),
    question: "Đâu là thủ đô của Việt Nam?",
    answerA: "Hà Nội",
    answerB: "Hồ Chí Minh",
    answerC: "Đà Nẵng",
    answerD: "Cần Thơ",
    correctAnswer: "A",
  },
];
