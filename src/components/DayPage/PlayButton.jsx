import Icon from "./Icon";

function PlayButton({ part, handleClick }) {
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
