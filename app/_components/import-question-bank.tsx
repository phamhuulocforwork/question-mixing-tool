import { QuizTable } from "@/components/quiz-table";
import { QuizList } from "@/types";
export default function ImportQuestionBank({
  data,
  setData,
}: {
  data: QuizList;
  setData: React.Dispatch<React.SetStateAction<QuizList>>;
}) {
  return (
    <div className='rounded-md shadow-xl border p-4'>
      <QuizTable data={data} setData={setData} />
    </div>
  );
}
