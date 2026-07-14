import { Link } from "react-router";
import Icon from "./Icon";

function IconLink({
  classNameLink = "",
  to,
  ariaLabel,
  classNameIcon = "",
  icon,
}) {
  return (
    <Link
      className={`${classNameLink} button button--icon-only`.trim()}
      to={to}
      aria-label={ariaLabel}
    >
      <Icon className={classNameIcon} name={icon} />
    </Link>
  );
}

export default IconLink;
