import { useParams } from "react-router";
import { daysData } from "../../config/daysData";
import Icon from "./Icon";

function PlayButton({ part, inputContent, setOutput }) {
  const { day } = useParams();

  function handleClick() {
    const script = daysData[Number(day)][`part${part}`];
    const result = script(inputContent);
    setOutput(result);
  }

  return (
    <button
      type="button"
      className="result__action button button--icon-only"
      aria-label={`Run Part ${part}`}
      onClick={handleClick}
    >
      <Icon className="icon--lg" name="play" />
    </button>
  );
}

export default PlayButton;
