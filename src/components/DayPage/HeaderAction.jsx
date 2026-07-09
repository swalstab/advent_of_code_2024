import { useParams } from "react-router";

function HeaderAction() {
  const { day } = useParams();
  const link = `https://adventofcode.com/2024/day/${day}`;

  return (
    <a
      className="header__action"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      Explore Task &rarr;
    </a>
  );
}

export default HeaderAction;
