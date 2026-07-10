import { useParams } from "react-router";
import { daysData } from "../../config/daysData";
import { getResult } from "../../utils/utils";
import Icon from "./Icon";

function PlayButton({ part, inputContent, setOutput }) {
  const { day } = useParams();
  const script = daysData[Number(day)]?.[`part${part}`];

  function handleClick() {
    setOutput(getResult(inputContent, script));
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
