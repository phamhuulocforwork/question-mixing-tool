"use client";

import * as React from "react";

import { CircleCheck, CircleHelp } from "lucide-react";

import { CsvImporter } from "@/components/csv-importer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { QuestionList } from "@/types";

export function QuizTable({
  data,
  setData,
}: {
  data: QuestionList;
  setData: React.Dispatch<React.SetStateAction<QuestionList>>;
}) {
  return (
    <div className='flex flex-col gap-4'>
      <CsvImporter
        fields={[
          { label: "Câu hỏi", value: "question", required: true },
          { label: "Đáp án A", value: "answerA", required: true },
          { label: "Đáp án B", value: "answerB", required: true },
          { label: "Đáp án C", value: "answerC", required: true },
          { label: "Đáp án D", value: "answerD", required: true },
          { label: "Đáp án đúng", value: "correctAnswer", required: true },
        ]}
        onImport={(parsedData) => {
          const formattedData: QuestionList = parsedData.map((item) => ({
            id: crypto.randomUUID(),
            question: String(item.question ?? ""),
            answerA: String(item.answerA ?? ""),
            answerB: String(item.answerB ?? ""),
            answerC: String(item.answerC ?? ""),
            answerD: String(item.answerD ?? ""),
            correctAnswer: String(item.correctAnswer ?? ""),
          }));
          setData(formattedData);
        }}
        className='self-end bg-emerald-400/30'
      />
      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow className='bg-muted/50'>
              <TableHead className='flex items-center gap-1'>
                Câu hỏi
                <CircleHelp className='size-4 text-amber-500' />
              </TableHead>
              <TableHead>Đáp án 1</TableHead>
              <TableHead>Đáp án 2</TableHead>
              <TableHead>Đáp án 3</TableHead>
              <TableHead>Đáp án 4</TableHead>
              <TableHead className='flex items-center gap-1'>
                Đáp án đúng
                <CircleCheck className='size-4 text-emerald-500' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className='font-medium max-w-32'>
                  <span className='line-clamp-1'>{item.question}</span>
                </TableCell>
                <TableCell className='max-w-24'>
                  <span className='line-clamp-1'>{item.answerA}</span>
                </TableCell>
                <TableCell className='max-w-24'>
                  <span className='line-clamp-1'>{item.answerB}</span>
                </TableCell>
                <TableCell className='max-w-24'>
                  <span className='line-clamp-1'>{item.answerC}</span>
                </TableCell>
                <TableCell className='max-w-24'>
                  <span className='line-clamp-1'>{item.answerD}</span>
                </TableCell>
                <TableCell className='max-w-24'>
                  <span className='line-clamp-1'>{item.correctAnswer}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
