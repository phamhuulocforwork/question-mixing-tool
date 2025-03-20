import { QuizTable } from "@/components/quiz-table";

import { QuestionList } from "@/types";

export default function ImportQuestionBank({
  data,
  setData,
}: {
  data: QuestionList;
  setData: React.Dispatch<React.SetStateAction<QuestionList>>;
}) {
  return (
    <div className='rounded-md shadow-xl border p-4'>
      <QuizTable data={data} setData={setData} />
    </div>
  );
}
