import { useParams } from "react-router";
import { daysData } from "../../config/daysData";
import { getInput, getInputPath } from "../../utils/utils";
import Button from "./Button";

function EditorActions({ dispatch }) {
  const { day } = useParams();
  const inputs = daysData[Number(day)]?.input;

  async function handleClick(fileName) {
    const path = getInputPath(day, fileName);
    const content = await getInput(path);
    dispatch({ type: "setInput", payload: content });
  }

  return (
    <div className="editor__actions u-mb-6">
      {inputs.map((input) => (
        <Button key={input} onClick={() => handleClick(input)}>
          {input === "final"
            ? "Puzzle Input"
            : input[0].toUpperCase() + input.slice(1)}
        </Button>
      ))}
    </div>
  );
}

export default EditorActions;
