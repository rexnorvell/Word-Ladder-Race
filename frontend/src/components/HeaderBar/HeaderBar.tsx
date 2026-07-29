import Logo from "../../assets/images/logo.png";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import TextBlock from "../TextBlock/TextBlock";
import "./HeaderBar.css";
import { useAuth } from "../../contexts/AuthContext";

function HeaderBar() {
  const authContext = useAuth();

  const options: [string, string][] = [
    ["Home", "/home"],
    ["Play", "/game"],
  ];
  if (authContext.user) {
    options.push(["Account", "/account"]);
  } else {
    options.push(["Login", "/login"], ["Register", "/register"]);
  }

  return (
    <div className="HeaderBarContainer">
      <img src={Logo} alt="" style={{ width: "4.8em", height: "5em" }}></img>
      <div className="HeaderBarLeft">
        <TextBlock size={3} className="HeaderBar" textAlign="left">
          <strong>Rex's Word Ladder Race</strong>
        </TextBlock>
        <TextBlock size={6} className="HeaderBar" textAlign="left">
          {authContext.user ? `Welcome, ${authContext.user}!` : "Welcome!"}
        </TextBlock>
      </div>
      <div className="HeaderBarRight">
        <HamburgerMenu options={options} />
      </div>
    </div>
  );
}

export default HeaderBar;
