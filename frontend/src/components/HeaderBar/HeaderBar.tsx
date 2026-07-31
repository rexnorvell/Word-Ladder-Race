import Logo from "../../assets/images/logo.png";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import TextBlock from "../TextBlock/TextBlock";
import "./HeaderBar.css";
import { useAuth } from "../../contexts/AuthContext";

function HeaderBar() {
  const authContext = useAuth();

  let welcomeMessage: string = "\u00A0";
  const options: [string, string][] = [["Home", "/home"]];
  if (authContext.user) {
    welcomeMessage = `Welcome, ${authContext.user}!`;
    options.push(["Play", "/game"], ["Account", "/account"]);
  } else if (!authContext.loading && !authContext.user) {
    welcomeMessage = "Welcome!";
    options.push(["Log In", "/login"], ["Create User", "/register"]);
  }

  return (
    <div className="HeaderBarContainer">
      <img src={Logo} alt="" style={{ width: "4.8em", height: "5em" }}></img>
      <div className="HeaderBarLeft">
        <TextBlock size={3} className="HeaderBar" textAlign="left">
          <strong>Rex's Word Ladder Race</strong>
        </TextBlock>
        <TextBlock size={6} className="HeaderBar" textAlign="left">
          {welcomeMessage}
        </TextBlock>
      </div>
      <div className="HeaderBarRight">
        <HamburgerMenu options={options} />
      </div>
    </div>
  );
}

export default HeaderBar;
