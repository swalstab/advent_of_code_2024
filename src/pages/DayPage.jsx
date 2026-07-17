import { useParams } from "react-router";
import { DayProvider } from "../contexts/DayContext";
import { daysData } from "../config/daysData";

import Header from "../components/DayPage/Header";
import Editor from "../components/DayPage/Editor";
import Result from "../components/DayPage/Result";

import NotFoundPage from "./NotFoundPage";

function DayPage() {
  const { day } = useParams();

  const numericDay = Number(day);
  const part1IsSolved = daysData[day]?.part1 !== undefined;
  const part2IsSolved = daysData[day]?.part2 !== undefined;

  if (Number.isNaN(numericDay) || day < 1 || day > 25) return <NotFoundPage />;

  return (
    <>
      <Header />

      {part1IsSolved && (
        <DayProvider>
          <Editor />
          <Result part={1} solved={part1IsSolved} className="u-mb-6" />
          <Result part={2} solved={part2IsSolved} className="u-mb-9" />
        </DayProvider>
      )}
    </>
  );
}

export default DayPage;
