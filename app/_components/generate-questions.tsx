import React, { useState } from "react";

import {
  AlignmentType,
  BorderStyle,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  generateAnswerKeys,
  generateQuestionVariants,
} from "@/lib/question-mixer";

import { QuestionList } from "@/types";

interface GenerateOptions {
  useCustomTemplate: boolean;
  useZipDownload: boolean;
  columnCount: number;
}

export default function GenerateQuestions({ data }: { data: QuestionList }) {
  const [options, setOptions] = useState<GenerateOptions>({
    useCustomTemplate: false,
    useZipDownload: true,
    columnCount: 4,
  });

  const [numberOfVariants, setNumberOfVariants] = useState<number>(1);

  React.useEffect(() => {
    const savedOptions = localStorage.getItem("questionOptions");
    if (savedOptions) {
      try {
        const parsedOptions = JSON.parse(savedOptions);
        setOptions((prev) => ({
          ...prev,
          useCustomTemplate: parsedOptions.useCustomTemplate || false,
          useZipDownload: parsedOptions.zipDownload || true,
          columnCount: parsedOptions.columnCount || 4,
        }));

        if (parsedOptions.numberOfVariants) {
          setNumberOfVariants(parsedOptions.numberOfVariants);
        }
      } catch (error) {
        console.error("Failed to parse saved options", error);
      }
    }
  }, []);

  const createAnswerTable = (answers: string[]) => {
    const rows: TableRow[] = [];
    const totalQuestions = answers.length;

    // Sử dụng columnCount từ tùy chọn người dùng
    const columns = options.columnCount;
    const questionsPerColumn = Math.ceil(totalQuestions / columns);

    // Tạo hàng tiêu đề
    const headerCells: TableCell[] = [];
    for (let i = 0; i < columns; i++) {
      headerCells.push(
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Câu",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: "center",
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Đáp án",
                  bold: true,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
          ],
          verticalAlign: "center",
        }),
      );
    }

    const headerRow = new TableRow({
      children: headerCells,
      tableHeader: true,
    });
    rows.push(headerRow);

    // Tạo các hàng dữ liệu
    for (let i = 0; i < questionsPerColumn; i++) {
      const cells: TableCell[] = [];

      for (let col = 0; col < columns; col++) {
        const idx = i + col * questionsPerColumn;
        if (idx < totalQuestions) {
          cells.push(
            new TableCell({
              children: [
                new Paragraph({
                  text: (idx + 1).toString(),
                  alignment: AlignmentType.CENTER,
                }),
              ],
              verticalAlign: "center",
            }),
            new TableCell({
              children: [
                new Paragraph({
                  text: answers[idx] || "",
                  alignment: AlignmentType.CENTER,
                }),
              ],
              verticalAlign: "center",
            }),
          );
        } else {
          cells.push(
            new TableCell({ children: [new Paragraph("")] }),
            new TableCell({ children: [new Paragraph("")] }),
          );
        }
      }

      rows.push(new TableRow({ children: cells }));
    }

    // Tạo đối tượng bảng với widths tự động điều chỉnh theo số cột
    const columnWidths = Array(columns * 2).fill(100 / (columns * 2));

    return new Table({
      rows,
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 1 },
        bottom: { style: BorderStyle.SINGLE, size: 1 },
        left: { style: BorderStyle.SINGLE, size: 1 },
        right: { style: BorderStyle.SINGLE, size: 1 },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
        insideVertical: { style: BorderStyle.SINGLE, size: 1 },
      },
      columnWidths,
    });
  };

  const handleSubmit = async () => {
    const variants = generateQuestionVariants(data, numberOfVariants);
    const answerKeys = generateAnswerKeys(variants);

    // Nếu sử dụng nén ZIP và có nhiều hơn 1 đề
    if (options.useZipDownload && numberOfVariants > 1) {
      const zip = new JSZip();

      for (
        let variantIndex = 0;
        variantIndex < variants.length;
        variantIndex++
      ) {
        const variantNumber = variantIndex + 1;
        const questions = variants[variantIndex];
        const answers = answerKeys[variantNumber];

        // Tạo đề thi
        const questionDoc = createQuestionDocument(questions, variantNumber);
        const questionBlob = await Packer.toBlob(questionDoc);
        zip.file(
          `de-thi-${variantNumber.toString().padStart(3, "0")}.docx`,
          questionBlob,
        );

        // Tạo đáp án
        const answerDoc = createAnswerDocument(answers, variantNumber);
        const answerBlob = await Packer.toBlob(answerDoc);
        zip.file(
          `dap-an-${variantNumber.toString().padStart(3, "0")}.docx`,
          answerBlob,
        );
      }

      // Tạo và tải xuống file zip
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "de-thi-va-dap-an.zip");
    } else {
      // Cách cũ nếu không sử dụng ZIP
      variants.forEach((questions, variantIndex) => {
        const variantNumber = variantIndex + 1;
        const answers = answerKeys[variantNumber];

        // Tạo và tải xuống đề thi
        const questionDoc = createQuestionDocument(questions, variantNumber);
        Packer.toBlob(questionDoc).then((blob) => {
          saveAs(
            blob,
            `de-thi-${variantNumber.toString().padStart(3, "0")}.docx`,
          );
        });

        // Tạo và tải xuống đáp án
        const answerDoc = createAnswerDocument(answers, variantNumber);
        Packer.toBlob(answerDoc).then((blob) => {
          saveAs(
            blob,
            `dap-an-${variantNumber.toString().padStart(3, "0")}.docx`,
          );
        });
      });
    }
  };

  // Tạo tài liệu đề thi
  const createQuestionDocument = (
    questions: QuestionList,
    variantNumber: number,
  ) => {
    const children: Paragraph[] = [];

    // Thêm tiêu đề
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `ĐỀ THI TRẮC NGHIỆM - MÃ ĐỀ ${variantNumber.toString().padStart(3, "0")}`,
            bold: true,
            size: 28,
          }),
        ],
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 400,
        },
      }),
    );

    // Thêm các câu hỏi
    questions.forEach((question, qIndex) => {
      children.push(
        new Paragraph({
          children: [
            new TextRun({
              text: `Câu ${qIndex + 1}: `,
              bold: true,
            }),
            new TextRun(question.question),
          ],
          spacing: {
            after: 120,
          },
        }),
        new Paragraph({
          text: `A. ${question.answerA}`,
          spacing: {
            after: 120,
          },
        }),
        new Paragraph({
          text: `B. ${question.answerB}`,
          spacing: {
            after: 120,
          },
        }),
        new Paragraph({
          text: `C. ${question.answerC}`,
          spacing: {
            after: 120,
          },
        }),
        new Paragraph({
          text: `D. ${question.answerD}`,
          spacing: {
            after: 240,
          },
        }),
      );
    });

    return new Document({
      styles: {
        default: {
          document: {
            run: {
              font: "Times New Roman",
              size: 26,
            },
            paragraph: {
              spacing: {
                after: 120,
              },
            },
          },
        },
      },
      sections: [
        {
          children: children,
        },
      ],
    });
  };

  // Tạo tài liệu đáp án
  const createAnswerDocument = (answers: string[], variantNumber: number) => {
    return new Document({
      styles: {
        default: {
          document: {
            run: {
              font: "Times New Roman",
              size: 26,
            },
            paragraph: {
              spacing: {
                after: 120,
              },
            },
          },
        },
      },
      sections: [
        {
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `ĐÁP ÁN ĐỀ THI - MÃ ĐỀ ${variantNumber.toString().padStart(3, "0")}`,
                  bold: true,
                  size: 28,
                }),
              ],
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 400,
              },
            }),
            createAnswerTable(answers),
          ],
        },
      ],
    });
  };

  return (
    <Button onClick={handleSubmit}>
      <Download />
      Tải xuống
    </Button>
  );
}
