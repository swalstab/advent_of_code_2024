import { useParams } from "react-router";
import IconLink from "./IconLink";

function TitleGroup() {
  const { day } = useParams();

  return (
    <div className="header__title-group">
      {Number(day) > 1 && (
        <IconLink
          to={`/day/${Number(day) - 1}`}
          ariaLabel="Go to previous solved day"
          icon="left"
        />
      )}
      <h1 className="heading heading--xl" style={{ gridColumn: 2 }}>
        Day {day}
      </h1>
      {Number(day) < 25 && (
        <IconLink
          to={`/day/${Number(day) + 1}`}
          ariaLabel="Go to next solved day"
          icon="right"
        />
      )}
    </div>
  );
}

export default TitleGroup;
