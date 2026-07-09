import { useParams } from "react-router";
import { daysData } from "../../config/daysData";
import { getInput, getInputPath } from "../../utils/inputs";
import Button from "./Button";

function EditorActions({ setInputContent }) {
  const { day } = useParams();
  const inputs = daysData[Number(day)]?.input;

  async function handleClick(fileName) {
    const path = getInputPath(day, fileName);
    const content = await getInput(path);
    setInputContent(content);
  }

  return (
    <div className="editor__actions u-mb-6">
      {inputs.map((input) => (
        <Button key={input} onClick={() => handleClick(input)}>
          {input}
        </Button>
      ))}
    </div>
  );
}

export default EditorActions;
