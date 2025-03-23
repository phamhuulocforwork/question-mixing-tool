"use client";

import * as React from "react";

import Image from "next/image";

import { Check, ChevronLeft, ChevronRight, FileSearch, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";

interface TutorialStep {
  title: string;
  description: React.ReactNode;
  image?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: "Bước 1. Chọn bộ câu hỏi",
    description: (
      <div className='indent-4'>
        Upload file CSV với các cột như hình dưới. Lần lượt là:{" "}
        <span className='font-bold'>
          {" "}
          Câu hỏi, đáp án A, đáp án B, đáp án C, đáp án D, Đáp án đúng.{" "}
        </span>
        Bạn có thể tải{" "}
        <a
          className='text-blue-600 after:content-["_↓_"]'
          href='/template.csv'
          target='_blank'
        >
          file mẫu
        </a>
        để tham khảo. Sau khi upload bạn có thể xem lại file CSV đã upload sau
        đó tiếp tục.
      </div>
    ),
    image: "/step1.png",
  },
  {
    title: "Bước 2. Tạo đề, đáp án",
    description: (
      <div className='indent-4'>
        Sau khi upload file CSV, bạn có thể nhập số lượng mã đề muốn tạo và tải
        xuống file đề, đáp án.
      </div>
    ),
    image: "/step2.png",
  },
];

export default function UsageDrawer() {
  const [open, setOpen] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);

  const totalSteps = tutorialSteps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setOpen(false);
      // Reset to first step when closing after completion
      setTimeout(() => setCurrentStep(0), 300);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset to first step when manually closing
    setTimeout(() => setCurrentStep(0), 300);
  };
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline' className='cursor-pointer'>
          <FileSearch /> Xem hướng dẫn
        </Button>
      </DrawerTrigger>
      <DrawerContent className='max-h-[90vh]'>
        <div className='mx-auto w-full max-w-xl'>
          <DrawerHeader>
            <div className='flex items-center justify-between'>
              <DrawerTitle className='text-xl font-bold'>
                {tutorialSteps[currentStep].title}
              </DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant='ghost'
                  size='icon'
                  className='h-8 w-8 rounded-full'
                  onClick={handleClose}
                >
                  <X className='h-4 w-4' />
                  <span className='sr-only'>Đóng</span>
                </Button>
              </DrawerClose>
            </div>
            <div className='flex items-center justify-center gap-2'>
              <span className='text-xs text-muted-foreground text-nowrap'>
                Bước {currentStep + 1} / {totalSteps}
              </span>
              <Progress value={progress} />
            </div>
          </DrawerHeader>

          <div className='p-4 pb-0'>
            <div className='mb-4 text-sm text-foreground'>
              {tutorialSteps[currentStep].description}
            </div>
            {tutorialSteps[currentStep].image && (
              <div className='overflow-hidden rounded-lg'>
                <Image
                  src={tutorialSteps[currentStep].image}
                  alt={`Minh họa cho ${tutorialSteps[currentStep].title}`}
                  width={600}
                  height={400}
                  className='w-full object-cover'
                />
              </div>
            )}
          </div>

          <DrawerFooter className='flex-row justify-between space-x-2 pt-2'>
            <Button
              variant='outline'
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className='flex-1'
            >
              <ChevronLeft className='mr-2 h-4 w-4' />
              Trước
            </Button>
            <Button onClick={handleNext} size='sm' className='flex-1'>
              {currentStep === totalSteps - 1 ? (
                <>
                  Hoàn thành
                  <Check className='ml-2 h-4 w-4' />
                </>
              ) : (
                <>
                  Tiếp
                  <ChevronRight className='ml-2 h-4 w-4' />
                </>
              )}
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
