import { useParams } from "react-router";
import DayPage from "./DayPage";

function DayPageRoute() {
  const { day } = useParams();
  return <DayPage key={day} />;
}

export default DayPageRoute;
