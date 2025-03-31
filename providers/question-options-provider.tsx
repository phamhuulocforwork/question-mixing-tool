"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export interface QuestionOptions {
  useCustomTemplate: boolean;
  questionTemplate: File | null;
  answerTemplate: File | null;
  columnCount: number;
  numberOfVariants: number;
  zipDownload: boolean;
  hasQuestionTemplate: boolean;
  hasAnswerTemplate: boolean;
}

const defaultOptions: QuestionOptions = {
  useCustomTemplate: false,
  questionTemplate: null,
  answerTemplate: null,
  columnCount: 4,
  numberOfVariants: 1,
  zipDownload: true,
  hasQuestionTemplate: false,
  hasAnswerTemplate: false,
};

type QuestionOptionsContextType = {
  options: QuestionOptions;
  updateOptions: (newOptions: Partial<QuestionOptions>) => void;
  saveTemplateFile: (
    type: "questionTemplate" | "answerTemplate",
    file: File,
  ) => void;
};

const QuestionOptionsContext = createContext<
  QuestionOptionsContextType | undefined
>(undefined);

export function QuestionOptionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [options, setOptions] = useState<QuestionOptions>(defaultOptions);

  useEffect(() => {
    const savedOptions = localStorage.getItem("questionOptions");
    if (savedOptions) {
      try {
        const parsedOptions = JSON.parse(savedOptions);
        setOptions((prevOptions) => ({
          ...prevOptions,
          useCustomTemplate:
            parsedOptions.useCustomTemplate ?? prevOptions.useCustomTemplate,
          columnCount: parsedOptions.columnCount ?? prevOptions.columnCount,
          numberOfVariants:
            parsedOptions.numberOfVariants ?? prevOptions.numberOfVariants,
          zipDownload: parsedOptions.zipDownload ?? prevOptions.zipDownload,
          hasQuestionTemplate:
            parsedOptions.hasQuestionTemplate ??
            prevOptions.hasQuestionTemplate,
          hasAnswerTemplate:
            parsedOptions.hasAnswerTemplate ?? prevOptions.hasAnswerTemplate,
        }));
      } catch (error) {
        console.error("Failed to parse saved options", error);
      }
    }
  }, []);

  useEffect(() => {
    const optionsToSave = {
      useCustomTemplate: options.useCustomTemplate,
      columnCount: options.columnCount,
      numberOfVariants: options.numberOfVariants,
      zipDownload: options.zipDownload,
      hasQuestionTemplate: options.hasQuestionTemplate,
      hasAnswerTemplate: options.hasAnswerTemplate,
    };
    localStorage.setItem("questionOptions", JSON.stringify(optionsToSave));
  }, [options]);

  const updateOptions = (newOptions: Partial<QuestionOptions>) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      ...newOptions,
    }));
  };

  const saveTemplateFile = (
    type: "questionTemplate" | "answerTemplate",
    file: File,
  ) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [type]: file,
      [type === "questionTemplate"
        ? "hasQuestionTemplate"
        : "hasAnswerTemplate"]: true,
    }));

    try {
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      };
      sessionStorage.setItem(`template_${type}`, JSON.stringify(fileInfo));
    } catch (error) {
      console.error(`Failed to save ${type} information`, error);
    }
  };

  const value = {
    options,
    updateOptions,
    saveTemplateFile,
  };

  return (
    <QuestionOptionsContext.Provider value={value}>
      {children}
    </QuestionOptionsContext.Provider>
  );
}

export function useQuestionOptions() {
  const context = useContext(QuestionOptionsContext);
  if (context === undefined) {
    throw new Error(
      "useQuestionOptions must be used within a QuestionOptionsProvider",
    );
  }
  return context;
}
