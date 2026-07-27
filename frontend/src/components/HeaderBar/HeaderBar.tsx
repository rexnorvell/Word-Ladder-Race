import Logo from "../../assets/images/logo.png";
import { useEffect, useState } from "react";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import TextBlock from "../TextBlock/TextBlock";
import { getUser } from "../../services/api";
import "./HeaderBar.css";

function HeaderBar() {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const user = await getUser();
      setUsername(user?.username);
    } catch (err) {
      console.error(err);
    }
  }

  const options: [string, string][] = [
    ["Home", "/home"],
    ["Play", "/game"],
  ];
  if (username) {
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
          {username ? `Welcome, ${username}!` : "Welcome!"}
        </TextBlock>
      </div>
      <div className="HeaderBarRight">
        <HamburgerMenu options={options} />
      </div>
    </div>
  );
}

export default HeaderBar;
