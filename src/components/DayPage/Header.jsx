import IconLink from "./IconLink";
import TitleGroup from "./TitleGroup";
import HeaderAction from "./HeaderAction";

function Header() {
  return (
    <header className="header u-mt-6 u-mb-8">
      <IconLink
        classNameLink="header__home-link"
        to="/"
        ariaLabel="Go to Homepage"
        classNameIcon="icon--lg"
        icon="home"
      />
      <TitleGroup />
      <HeaderAction />
    </header>
  );
}

export default Header;
