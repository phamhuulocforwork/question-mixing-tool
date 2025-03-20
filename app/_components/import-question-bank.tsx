import { QuizTable } from "@/components/quiz-table";
import { DataConfig } from "@/config/data";
export default function ImportQuestionBank({
  data,
  setData,
}: {
  data: DataConfig["quiz"];
  setData: React.Dispatch<React.SetStateAction<DataConfig["quiz"]>>;
}) {
  return (
    <div className='rounded-md border p-4'>
      <QuizTable data={data} setData={setData} />
    </div>
  );
}
