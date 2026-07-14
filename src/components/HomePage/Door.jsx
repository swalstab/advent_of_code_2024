import { Link } from "react-router";

function Door({ day, solved }) {
  return (
    <li>
      <Link
        to={`day/${day}`}
        aria-label={`Day ${day} is ${solved ? "" : "not "}solved`}
        aria-disabled={!solved}
        className={`door ${solved ? "door--solved" : "door--unsolved"}`}
        onClick={(e) => {
          if (!solved) e.preventDefault();
        }}
      >
        <span className="door__day-number">{day}</span>
        {!solved && (
          <span className="door__state-text" aria-hidden="true">
            Not <br /> solved
          </span>
        )}
      </Link>
    </li>
  );
}

export default Door;
