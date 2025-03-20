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
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  generateAnswerKeys,
  generateQuestionVariants,
} from "@/lib/question-mixer";

import { QuestionList } from "@/types";

export default function GenerateQuestions({ data }: { data: QuestionList }) {
  const [numberOfVariants, setNumberOfVariants] = useState<number>(1);

  const createAnswerTable = (answers: string[]) => {
    const rows: TableRow[] = [];
    const totalQuestions = answers.length;

    const columns = 4;
    const questionsPerColumn = Math.ceil(totalQuestions / columns);

    const headerRow = new TableRow({
      children: [
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
      ],
      tableHeader: true,
    });
    rows.push(headerRow);

    for (let i = 0; i < questionsPerColumn; i++) {
      const cells: TableCell[] = [];

      if (i < questionsPerColumn) {
        cells.push(
          new TableCell({
            children: [
              new Paragraph({
                text: (i + 1).toString(),
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: "center",
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: answers[i] || "",
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: "center",
          }),
        );
      }

      const idx2 = i + questionsPerColumn;
      if (idx2 < totalQuestions) {
        cells.push(
          new TableCell({
            children: [
              new Paragraph({
                text: (idx2 + 1).toString(),
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: "center",
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: answers[idx2] || "",
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

      const idx3 = i + questionsPerColumn * 2;
      if (idx3 < totalQuestions) {
        cells.push(
          new TableCell({
            children: [
              new Paragraph({
                text: (idx3 + 1).toString(),
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: "center",
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: answers[idx3] || "",
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

      const idx4 = i + questionsPerColumn * 3;
      if (idx4 < totalQuestions) {
        cells.push(
          new TableCell({
            children: [
              new Paragraph({
                text: (idx4 + 1).toString(),
                alignment: AlignmentType.CENTER,
              }),
            ],
            verticalAlign: "center",
          }),
          new TableCell({
            children: [
              new Paragraph({
                text: answers[idx4] || "",
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

      rows.push(new TableRow({ children: cells }));
    }

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
      columnWidths: [7, 7, 7, 7, 7, 7, 7, 7],
    });
  };

  const handleSummit = () => {
    const variants = generateQuestionVariants(data, numberOfVariants);
    const answerKeys = generateAnswerKeys(variants);

    variants.forEach((questions, variantIndex) => {
      const variantNumber = variantIndex + 1;
      const answers = answerKeys[variantNumber];
      const children: (Paragraph | Table)[] = [];

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

      children.push(createAnswerTable(answers));

      const document = new Document({
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

      Packer.toBlob(document).then((blob) => {
        saveAs(blob, `${variantNumber.toString().padStart(3, "0")}.docx`);
      });
    });
  };

  return (
    <div className='rounded-md shadow-xl border p-4 space-y-4 flex flex-col items-center justify-center'>
      <div className='space-y-2 min-w-xl'>
        <Label htmlFor='number-of-variants'>Số lượng mã đề</Label>
        <div className='flex items-center gap-2'>
          <Input
            id='number-of-variants'
            type='number'
            min={1}
            max={20}
            value={numberOfVariants}
            onChange={(e) => setNumberOfVariants(parseInt(e.target.value) || 1)}
            className='w-full max-w-xs'
          />
          <Button onClick={handleSummit}>
            <Download />
            Tải xuống
          </Button>
        </div>
      </div>
    </div>
  );
}
