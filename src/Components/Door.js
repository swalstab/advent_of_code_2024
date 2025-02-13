import { useState } from "react";

function Door({ day, daysSolved, onDoorClick }) {
  const [doorText, setDoorText] = useState(day);
  const [style, setStyle] = useState({});

  function handleMouseOver() {
    if (!daysSolved[day - 1]) {
      setDoorText("not solved");
      setStyle({ fontSize: "calc(var(--font-size-field) * 0.5)" });
    }
    if (daysSolved[day - 1]) {
      setStyle({
        backgroundColor: "var(--color-field--dark)",
        transition: "0.3s",
      });
    }
  }

  function handleMouseOut() {
    setDoorText(day);
    daysSolved[day - 1] &&
      setStyle({ backgroundColor: "var(--color-field)", transition: "0.3s" });
    !daysSolved[day - 1] && setStyle({ fontSize: "var(--font-size-field)" });
  }

  return (
    <div
      className={`door ${daysSolved[day - 1] ? "" : "inactive"}`}
      style={style}
      onClick={onDoorClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <h2>{doorText}</h2>
    </div>
  );
}

export default Door;
