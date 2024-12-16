import React, { useState } from "react";
import Robot from "../assets/images/robot.png";
import Uploader from "../components/uploader";
import { Input } from "../components/input";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

const Home = () => {
  const [csvData, setCsvData] = useState(null);

  // React.useEffect(() => {
  //   console.log(csvData);
  // }, [csvData]);

  const handleSummit = () => {
    // const number = document.getElementById("number").value;
    // if (!number) {
    //   document.getElementById("number").classList.add("invalid");
    //   return;
    // }
    class DocumentCreator {
      create(questions) {
        const children = questions
          .map((question, index) => [
            new Paragraph({
              children: [
                new TextRun({
                  text: `Câu ${index + 1}: `,
                  bold: true,
                }),
                new TextRun(question.question),
              ],
            }),
            new Paragraph(`A. ${question.answerA}`),
            new Paragraph(`B. ${question.answerB}`),
            new Paragraph(`C. ${question.answerC}`),
            new Paragraph(`D. ${question.answerD}`),
          ])
          .flat();

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
        return document;
      }
    }

    const documentCreator = new DocumentCreator();
    const doc = documentCreator.create(csvData);

    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "questions.docx");
    });
  };

  return (
    <div className="bg-white w-full container rounded-xl p-4 flex flex-col gap-4">
      <div className="flex justify-center animate-bounce items-center flex-col size-48 absolute left-4 bottom-4 group">
        <span className="text-slate-900 relative text-center p-2 rounded-md bg-white before:size-4 before:absolute before:-bottom-2 before:left-1/2 before:rotate-45 before:bg-white">
          Bấm vào đây để xem hướng dẫn
        </span>
        <img className="size-48 peer cursor-pointer" src={Robot} alt="robot" />
      </div>

      <Uploader setCsvData={setCsvData}></Uploader>

      <div className="w-full grid grid-cols-1 gap-4">
        <div className="form-group">
          <label htmlFor="" className="font-semibold text-sm">
            Số lượng mã đề cần tạo
          </label>
          <Input
            id="number"
            type="number"
            className="peer invalid:border-2 invalid:border-red-500"
          />
          <p class="mt-1 invisible peer-invalid:visible text-red-600 text-sm">
            Vui lòng nhập số lượng mã đề cần tạo.
          </p>
        </div>
      </div>

      <button
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm text-white ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-sky-400 h-10 px-4 py-2 font-semibold"
        onClick={handleSummit}
      >
        TẠO BÀI KIỂM TRA
      </button>
    </div>
  );
};

export default Home;
