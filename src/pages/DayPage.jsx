import { useState } from "react";
import { useParams } from "react-router";
import { daysData } from "../config/daysData";

import Header from "../components/DayPage/Header";
import Editor from "../components/DayPage/Editor";
import Result from "../components/DayPage/Result";

import NotFoundPage from "./NotFoundPage";

function DayPage() {
  const { day } = useParams();
  const [inputContent, setInputContent] = useState("");

  const numericDay = Number(day);
  const part1IsSolved = daysData[day]?.part1 !== undefined;
  const part2IsSolved = daysData[day]?.part2 !== undefined;

  if (Number.isNaN(numericDay) || day < 1 || day > 25) return <NotFoundPage />;

  return (
    <>
      <Header />

      {part1IsSolved && (
        <>
          <Editor
            inputContent={inputContent}
            setInputContent={setInputContent}
          />
          <Result
            part={1}
            solved={part1IsSolved}
            inputContent={inputContent}
            className="u-mb-6"
          />
          <Result
            part={2}
            solved={part2IsSolved}
            inputContent={inputContent}
            className="u-mb-9"
          />
        </>
      )}
    </>
  );
}

export default DayPage;
