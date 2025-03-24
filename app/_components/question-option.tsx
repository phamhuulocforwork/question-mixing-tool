import React, { useEffect, useState } from "react";

import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { QuestionList } from "@/types";

interface TemplateOptions {
  useCustomTemplate: boolean;
  questionTemplate: File | null;
  answerTemplate: File | null;
  zipDownload: boolean;
  columnCount: number;
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
    zipDownload: true,
    columnCount: 4,
  });

  useEffect(() => {
    const optionsToSave = {
      useCustomTemplate: templateOptions.useCustomTemplate,
      zipDownload: templateOptions.zipDownload,
      columnCount: templateOptions.columnCount,
    };
    localStorage.setItem("questionOptions", JSON.stringify(optionsToSave));
  }, [
    templateOptions.useCustomTemplate,
    templateOptions.zipDownload,
    templateOptions.columnCount,
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

  const handleZipToggle = (checked: boolean) => {
    setTemplateOptions({
      ...templateOptions,
      zipDownload: checked,
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

  const renderColumnExampleTable = () => {
    const columns = [];
    for (let i = 0; i < templateOptions.columnCount; i++) {
      columns.push(
        <div key={i} className='flex gap-2'>
          <div className='px-2 py-0.5 rounded-sm border flex items-center justify-center text-center text-nowrap'>
            Câu
          </div>
          <div className='px-2 py-0.5 rounded-sm border flex items-center justify-center text-center text-nowrap'>
            Đáp án
          </div>
        </div>,
      );
    }

    return (
      <div className='mt-4 border p-4 rounded-md'>
        <h3 className='text-sm font-medium mb-2'>
          Xem trước bố cục bảng đáp án:
        </h3>
        <div className='flex flex-wrap gap-4 justify-center'>{columns}</div>
      </div>
    );
  };

  return (
    <div className='rounded-md shadow-xl border p-4 space-y-4'>
      <div className='space-y-2'>
        <h2 className='text-xl font-bold'>Tùy chọn mẫu đề thi</h2>
        <p className='text-sm text-muted-foreground'>
          Tùy chỉnh cách hiển thị câu hỏi và đáp án trong đề thi
        </p>
        <div className='space-y-4 py-4'>
          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              id='use-custom-template'
              checked={templateOptions.useCustomTemplate}
              onChange={(e) => handleTemplateToggle(e.target.checked)}
            />
            <Label htmlFor='use-custom-template'>
              Sử dụng mẫu đề thi tùy chỉnh
            </Label>
          </div>

          {templateOptions.useCustomTemplate && (
            <div className='space-y-4 mt-4 pl-6'>
              <div className='space-y-2'>
                <Label htmlFor='question-template'>Mẫu câu hỏi</Label>
                <div className='flex items-center gap-2'>
                  <Input
                    id='question-template'
                    type='file'
                    accept='.docx'
                    onChange={handleQuestionTemplateChange}
                  />
                  <Button
                    size='icon'
                    variant='outline'
                    className='shrink-0'
                    disabled={!templateOptions.questionTemplate}
                  >
                    <Upload className='h-4 w-4' />
                  </Button>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Tải lên file Word (.docx) làm mẫu hiển thị câu hỏi
                </p>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='answer-template'>Mẫu đáp án</Label>
                <div className='flex items-center gap-2'>
                  <Input
                    id='answer-template'
                    type='file'
                    accept='.docx'
                    onChange={handleAnswerTemplateChange}
                  />
                  <Button
                    size='icon'
                    variant='outline'
                    className='shrink-0'
                    disabled={!templateOptions.answerTemplate}
                  >
                    <Upload className='h-4 w-4' />
                  </Button>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Tải lên file Word (.docx) làm mẫu hiển thị đáp án
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Separator className='my-4' />

      <div className='space-y-2'>
        <h2 className='text-xl font-bold'>Tùy chọn xuất file</h2>
        <p className='text-sm text-muted-foreground'>
          Tùy chỉnh cách xuất file đề thi và đáp án
        </p>
        <div className='space-y-4 py-4'>
          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              id='zip-download'
              checked={templateOptions.zipDownload}
              onChange={(e) => handleZipToggle(e.target.checked)}
            />
            <Label htmlFor='zip-download'>
              Nén tất cả đề thi thành file ZIP khi tải xuống
            </Label>
          </div>

          <Separator className='my-4' />

          <div className='space-y-2'>
            <Label htmlFor='column-count'>Số cột trong bảng đáp án</Label>
            <div className='flex items-center gap-2'>
              <Input
                id='column-count'
                type='number'
                min={1}
                max={8}
                value={templateOptions.columnCount}
                onChange={handleColumnCountChange}
                className='w-24'
              />
            </div>
            <p className='text-sm text-muted-foreground'>
              Điều chỉnh số cột hiển thị trong bảng đáp án (từ 1 đến 8)
            </p>
            {renderColumnExampleTable()}
          </div>
        </div>
      </div>
    </div>
  );
}
