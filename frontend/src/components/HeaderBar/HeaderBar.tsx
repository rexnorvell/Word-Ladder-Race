import TextBlock from "../TextBlock/TextBlock";

import "./HeaderBar.css";

function HeaderBar() {
  return (
    <div className="HeaderBarContainer">
      <TextBlock size={3} text="Rex's Word Ladder Race" className="HeaderBar" />
    </div>
  );
}

export default HeaderBar;
