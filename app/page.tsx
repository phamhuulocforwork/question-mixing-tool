"use client";

import * as React from "react";

import {
  ArrowLeft,
  ArrowRight,
  File,
  MousePointerClick,
  Upload,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { defineStepper } from "@/components/ui/stepper";

import useIsMobile from "@/hooks/use-mobile";

import { initialData } from "@/config/data";

import GenerateQuestions from "./_components/generate-questions";
import ImportQuestionBank from "./_components/import-question-bank";
import QuestionOption from "./_components/question-option";

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
    title: "Tùy chọn",
    description: "Tùy chọn thêm",
    icon: <MousePointerClick />,
  },
  {
    id: "3",
    title: "Tạo đề, đáp án",
    description: "Tạo đề, đáp án",
    icon: <File />,
    isLast: true,
  },
);

export default function Home() {
  const [data, setData] = React.useState(initialData);
  const isMobile = useIsMobile();

  return (
    <div className='flex w-full items-start my-24 justify-center'>
      <div className='container flex flex-col items-center gap-4 justify-center'>
        <h1 className='text-2xl mb-8 text-center font-bold uppercase'>
          CÔNG CỤ TRỘN CÂU HỎI TRẮC NGHIỆM, TẠO ĐỀ THI
        </h1>
        <StepperProvider
          className='space-y-4'
          variant={isMobile ? "vertical" : "horizontal"}
          labelOrientation={isMobile ? "horizontal" : "vertical"}
        >
          {({ methods }) => (
            <React.Fragment>
              <StepperNavigation className='mx-0 lg:mx-16'>
                {methods.all.map((step) => (
                  <StepperStep
                    key={step.id}
                    of={step.id}
                    onClick={() => methods.goTo(step.id)}
                    icon={step.icon}
                  >
                    <StepperTitle>{step.title}</StepperTitle>
                    {isMobile &&
                      methods.when(step.id, () => (
                        <StepperPanel>
                          {/* {step.id === "1" && (
                            <ImportQuestionBank data={data} setData={setData} />
                          )} */}
                          {step.id === "2" && (
                            <QuestionOption data={data} setData={setData} />
                          )}
                          {step.id === "3" && <GenerateQuestions data={data} />}
                        </StepperPanel>
                      ))}
                  </StepperStep>
                ))}
              </StepperNavigation>
              {!isMobile &&
                methods.switch({
                  "1": () => (
                    <StepperPanel>
                      <ImportQuestionBank data={data} setData={setData} />
                    </StepperPanel>
                  ),
                  "2": () => (
                    <StepperPanel>
                      <QuestionOption data={data} setData={setData} />
                    </StepperPanel>
                  ),
                  "3": () => (
                    <StepperPanel>
                      <GenerateQuestions data={data} />
                    </StepperPanel>
                  ),
                })}
              <StepperControls>
                {!methods.isLast && (
                  <Button
                    variant='secondary'
                    onClick={methods.prev}
                    disabled={methods.isFirst}
                  >
                    <ArrowLeft />
                    Quay lại
                  </Button>
                )}
                <Button onClick={methods.isLast ? methods.reset : methods.next}>
                  {methods.isLast ? (
                    <>
                      <X />
                      Hủy bỏ
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
