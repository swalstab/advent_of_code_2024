import { daysData } from "../config/daysData";
import Door from "../components/HomePage/Door";

function Homepage() {
  return (
    <>
      <h1 className="heading heading--xl u-mt-9 u-mb-8">Advent of Code 2024</h1>

      <ul className="calendar u-mb-6">
        {Array.from({ length: 25 }, (_, i) => {
          const day = i + 1;
          const isSolved = daysData[day]?.part1 !== undefined;

          return <Door key={day} day={day} solved={isSolved} />;
        })}
      </ul>
    </>
  );
}

export default Homepage;
