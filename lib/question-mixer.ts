import { Question, QuestionList } from "@/types";

export function shuffleQuestions(questions: QuestionList): QuestionList {
  const newQuestions = [...questions];

  for (let i = newQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newQuestions[i], newQuestions[j]] = [newQuestions[j], newQuestions[i]];
  }

  return newQuestions;
}

export function shuffleAnswers(question: Question): Question {
  const options = [
    { key: "A", value: question.answerA },
    { key: "B", value: question.answerB },
    { key: "C", value: question.answerC },
    { key: "D", value: question.answerD },
  ];

  const correctKey = question.correctAnswer;
  const correctValue = options.find((opt) => opt.key === correctKey)?.value;

  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const newCorrectKey = options.find((opt) => opt.value === correctValue)?.key;

  return {
    ...question,
    answerA: options[0].value,
    answerB: options[1].value,
    answerC: options[2].value,
    answerD: options[3].value,
    correctAnswer: newCorrectKey || correctKey,
  };
}

export function generateQuestionVariants(
  originalQuestions: QuestionList,
  numberOfVariants: number,
): QuestionList[] {
  const variants: QuestionList[] = [];

  for (let i = 0; i < numberOfVariants; i++) {
    const shuffledQuestions = shuffleQuestions(originalQuestions);

    const variantWithShuffledAnswers = shuffledQuestions.map((question) =>
      shuffleAnswers(question),
    );

    variants.push(variantWithShuffledAnswers);
  }

  return variants;
}

export function generateAnswerKeys(
  variants: QuestionList[],
): Record<number, string[]> {
  const answerKeys: Record<number, string[]> = {};

  variants.forEach((variant, variantIndex) => {
    answerKeys[variantIndex + 1] = variant.map(
      (question) => question.correctAnswer,
    );
  });

  return answerKeys;
}
