import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import TextBlock from "../TextBlock/TextBlock";

import "./HeaderBar.css";

function HeaderBar() {
  return (
    <div className="HeaderBarContainer">
      <TextBlock size={3} text="Rex's Word Ladder Race" className="HeaderBar" />
      <div className="HeaderBarRight">
        <HamburgerMenu
          options={[
            ["Home", "/home"],
            ["Play", "/game"],
            ["Login", "/login"],
            ["Register", "/register"],
          ]}
        />
      </div>
    </div>
  );
}

export default HeaderBar;
