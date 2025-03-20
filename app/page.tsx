"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";

import { defineStepper } from "@/components/ui/stepper";
import { MousePointerClick, Upload, ArrowLeft, ArrowRight } from "lucide-react";
import ImportQuestionBank from "./_components/import-question-bank";
import { initialData } from "@/config/data";

const {
  StepperProvider,
  StepperControls,
  StepperNavigation,
  StepperPanel,
  StepperStep,
  StepperTitle,
  StepperDescription,
} = defineStepper(
  {
    id: "1",
    title: "Bộ câu hỏi",
    description: "Tải lên bộ câu hỏi",
    icon: <Upload />,
  },
  {
    id: "2",
    title: "Chọn câu hỏi",
    description: "Chọn câu hỏi để trộn",
    icon: <MousePointerClick />,
  },
);

export default function Home() {
  const [data, setData] = React.useState(initialData);

  return (
    <div className='flex w-full items-start my-16 justify-center'>
      <div className='container flex flex-col items-center gap-4 justify-center'>
        <h1 className='text-2xl font-bold uppercase'>
          CÔNG CỤ TRỘN CÂU HỎI TRẮC NGHIỆM, TẠO ĐỀ THI
        </h1>
        <StepperProvider className='space-y-4' variant='horizontal'>
          {({ methods }) => (
            <React.Fragment>
              <StepperNavigation>
                {methods.all.map((step) => (
                  <StepperStep
                    key={step.id}
                    of={step.id}
                    onClick={() => methods.goTo(step.id)}
                    icon={step.icon}
                  >
                    <StepperTitle>{step.title}</StepperTitle>
                    <StepperDescription>{step.description}</StepperDescription>
                  </StepperStep>
                ))}
              </StepperNavigation>
              {methods.switch({
                "1": () => (
                  <StepperPanel>
                    <ImportQuestionBank data={data} setData={setData} />
                  </StepperPanel>
                ),
              })}
              <StepperControls>
                {!methods.isFirst && (
                  <Button variant='secondary' onClick={methods.prev}>
                    <ArrowLeft />
                    Quay lại
                  </Button>
                )}
                <Button onClick={methods.isLast ? methods.reset : methods.next}>
                  {methods.isLast ? (
                    <>
                      <ArrowLeft />
                      Quay lại
                    </>
                  ) : (
                    <>
                      Tiếp tục
                      <ArrowRight />
                    </>
                  )}
                </Button>
              </StepperControls>
            </React.Fragment>
          )}
        </StepperProvider>
      </div>
    </div>
  );
}
