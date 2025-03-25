import React, { useEffect, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { QuestionList } from "@/types";

interface TemplateOptions {
  useCustomTemplate: boolean;
  questionTemplate: File | null;
  answerTemplate: File | null;
  columnCount: number;
  numberOfVariants: number;
}

export default function QuestionOption({
  data,
  setData,
}: {
  data: QuestionList;
  setData: React.Dispatch<React.SetStateAction<QuestionList>>;
}) {
  const [templateOptions, setTemplateOptions] = useState<TemplateOptions>({
    useCustomTemplate: false,
    questionTemplate: null,
    answerTemplate: null,
    columnCount: 4,
    numberOfVariants: 1,
  });

  useEffect(() => {
    const optionsToSave = {
      useCustomTemplate: templateOptions.useCustomTemplate,
      columnCount: templateOptions.columnCount,
      numberOfVariants: templateOptions.numberOfVariants,
    };
    localStorage.setItem("questionOptions", JSON.stringify(optionsToSave));
  }, [
    templateOptions.useCustomTemplate,
    templateOptions.columnCount,
    templateOptions.numberOfVariants,
  ]);

  const handleQuestionTemplateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setTemplateOptions({
        ...templateOptions,
        questionTemplate: e.target.files[0],
      });
    }
  };

  const handleAnswerTemplateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files && e.target.files[0]) {
      setTemplateOptions({
        ...templateOptions,
        answerTemplate: e.target.files[0],
      });
    }
  };

  const handleTemplateToggle = (checked: boolean) => {
    setTemplateOptions({
      ...templateOptions,
      useCustomTemplate: checked,
    });
  };

  const handleColumnCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 8) {
      setTemplateOptions({
        ...templateOptions,
        columnCount: value,
      });
    }
  };

  const handleNumberOfVariantsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= 20) {
      setTemplateOptions({
        ...templateOptions,
        numberOfVariants: value,
      });
    }
  };

  return (
    <div className='rounded-md shadow-xl border p-8 space-y-4'>
      <div className='space-y-0.5'>
        <h2 className='text-lg font-bold'>Mẫu đề thi & mẫu đáp án</h2>
        <p className='text-xs text-muted-foreground'>
          Nếu không có mẫu tùy chỉnh, sẽ sử dụng mẫu mặc định
        </p>
        <div className='space-y-4 py-4'>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='use-custom-template'
              checked={templateOptions.useCustomTemplate}
              onCheckedChange={handleTemplateToggle}
            />
            <Label htmlFor='use-custom-template'>Sử dụng mẫu tùy chỉnh</Label>
          </div>

          {templateOptions.useCustomTemplate && (
            <div className='space-y-4 mt-4 pl-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label htmlFor='question-template'>Mẫu câu hỏi</Label>
                  <Input
                    id='question-template'
                    type='file'
                    accept='.docx'
                    onChange={handleQuestionTemplateChange}
                    className='cursor-pointer'
                  />
                  <p className='text-sm text-muted-foreground'>
                    Tải lên file Word (.docx) làm mẫu hiển thị câu hỏi
                  </p>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='answer-template'>Mẫu đáp án</Label>
                  <Input
                    id='answer-template'
                    type='file'
                    accept='.docx'
                    onChange={handleAnswerTemplateChange}
                    className='cursor-pointer'
                  />
                  <p className='text-sm text-muted-foreground'>
                    Tải lên file Word (.docx) làm mẫu hiển thị đáp án
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator className='my-4' />

      <div className='space-y-0.5'>
        <h2 className='text-lg font-bold'>Số lượng và bố cục</h2>
        <p className='text-xs text-muted-foreground'>
          Tùy chỉnh số lượng mã đề được tạo ra và bố cục bảng đáp án
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 my-4'>
          <div className='space-y-2 w-full'>
            <Label htmlFor='number-of-variants'>Số lượng mã đề</Label>
            <Input
              id='number-of-variants'
              type='number'
              min={1}
              max={20}
              value={templateOptions.numberOfVariants}
              onChange={handleNumberOfVariantsChange}
            />
          </div>

          <div className='space-y-2 w-full'>
            <Label htmlFor='column-count'>Số cột trong bảng đáp án</Label>
            <Input
              id='column-count'
              type='number'
              min={1}
              max={8}
              value={templateOptions.columnCount}
              onChange={handleColumnCountChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
