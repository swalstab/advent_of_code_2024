import Home from "./Home.js";
import Day from "./Day.js";
import data from "../data.js";
import { useState } from "react";

function App() {
  const [activeDay, setActiveDay] = useState("");
  const daysSolved = Array.from({ length: 25 }, (cur, idx) =>
    data[idx].part1 !== undefined ? true : false
  );
  const preDay = daysSolved.slice(0, activeDay - 1).lastIndexOf(true) + 1;
  const sucDay = daysSolved.slice(activeDay).indexOf(true) + activeDay + 1;

  function handleDoorClick(e) {
    const door = Number(e.target.textContent);

    !isNaN(door) && data[door - 1].part1 && setActiveDay(door);
  }

  function handleHomeClick() {
    setActiveDay("");
  }

  return (
    <div className="app">
      {!activeDay ? (
        <Home daysSolved={daysSolved} onDoorClick={handleDoorClick} />
      ) : (
        <Day
          day={activeDay}
          preDay={preDay}
          sucDay={sucDay}
          onHomeClick={handleHomeClick}
          setActiveDay={setActiveDay}
        />
      )}
    </div>
  );
}

export default App;
