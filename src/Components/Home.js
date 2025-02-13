import Door from "./Door.js";

function Home({ daysSolved, onDoorClick }) {
  const doors = Array.from({ length: 25 }, (cur, idx) => idx + 1);

  return (
    <>
      <h1>Advent of Code 2024</h1>
      <div className="doors">
        {doors.map((door, idx) => (
          <Door
            key={idx + 1}
            day={idx + 1}
            daysSolved={daysSolved}
            onDoorClick={onDoorClick}
          />
        ))}
      </div>
    </>
  );
}

export default Home;
