import { useReducer } from "react";
import { useParams } from "react-router";
import { daysData } from "../config/daysData";

import Header from "../components/DayPage/Header";
import Editor from "../components/DayPage/Editor";
import Result from "../components/DayPage/Result";

import NotFoundPage from "./NotFoundPage";

const initialState = {
  inputContent: "",
  outputs: {
    1: "",
    2: "",
  },
  isLoading: {
    1: false,
    2: false,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "setInput":
      return {
        ...state,
        inputContent: action.payload,
        outputs: {
          1: "",
          2: "",
        },
      };
    case "setOutput":
      return {
        ...state,
        outputs: {
          ...state.outputs,
          [action.part]: action.payload,
        },
      };
    case "setIsLoading":
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.part]: action.payload,
        },
      };
    case "resetOutput":
      return {
        ...state,
        outputs: {
          1: "",
          2: "",
        },
      };
    default:
      throw new Error("Unknown action");
  }
}

function DayPage() {
  const { day } = useParams();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { inputContent, outputs, isLoading } = state;

  const numericDay = Number(day);
  const part1IsSolved = daysData[day]?.part1 !== undefined;
  const part2IsSolved = daysData[day]?.part2 !== undefined;

  if (Number.isNaN(numericDay) || day < 1 || day > 25) return <NotFoundPage />;

  return (
    <>
      <Header />

      {part1IsSolved && (
        <>
          <Editor inputContent={inputContent} dispatch={dispatch} />
          <Result
            part={1}
            solved={part1IsSolved}
            inputContent={inputContent}
            output={outputs[1]}
            isLoading={isLoading[1]}
            dispatch={dispatch}
            className="u-mb-6"
          />
          <Result
            part={2}
            solved={part2IsSolved}
            inputContent={inputContent}
            output={outputs[2]}
            isLoading={isLoading[2]}
            dispatch={dispatch}
            className="u-mb-9"
          />
        </>
      )}
    </>
  );
}

export default DayPage;
