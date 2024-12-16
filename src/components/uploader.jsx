import React from "react";
import Papa from "papaparse";
import PropTypes from "prop-types";

const Uploader = ({ setCsvData }) => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const formattedData = result.data.map((row) => ({
            question: row[0],
            answerA: row[1],
            answerB: row[2],
            answerC: row[3],
            answerD: row[4],
            correctAnswer: row[5],
          }));
          setCsvData(formattedData);
        },
        header: false,
      });
    }
  };

  const [filename, setFileName] = React.useState(null);

  return (
    <main className="flex w-full flex-col gap-4">
      <form
        action=""
        className="flex cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-zinc-400 bg-white py-8"
      >
        <input
          id="uploader"
          type="file"
          accept=".csv"
          hidden
          onChange={(event) => {
            const file = event.target.files[0];
            setFileName(file.name);
            handleFileUpload(event);
          }}
        />

        <div className="flex flex-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-auto w-16 cursor-pointer text-primary-500"
            onClick={() => document.getElementById("uploader").click()}
          >
            <path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z"></path>
          </svg>
          {filename ? (
            <p className="font-base">
              Đã chọn file <span className="font-e font-semibold text-green-500">{filename}</span>.{" "}
              <span
                className="cursor-pointer font-semibold underline-offset-4 hover:underline"
                onClick={() => {
                  setFileName(null);
                  setCsvData(null);
                }}
              >
                Huỷ
              </span>
            </p>
          ) : (
            <p className="font-base">
              Chưa chọn file.{" "}
              <span
                className="cursor-pointer font-semibold underline-offset-4 hover:underline"
                onClick={() => document.getElementById("uploader").click()}
              >
                Chọn file
              </span>
            </p>
          )}
        </div>
      </form>
    </main>
  );
};

Uploader.propTypes = {};

export default Uploader;
