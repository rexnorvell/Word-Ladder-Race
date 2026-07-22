import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import hamburgerIcon from "../../assets/images/hamburger.svg";
import "./HamburgerMenu.css";
import { useState } from "react";

interface Props {
  options: [string, string][];
}

function HamburgerMenu({ options }: Props) {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="HamburgerMenu">
      <Button
        icon={
          <img
            src={hamburgerIcon}
            alt=""
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          />
        }
      />
      {showDropdown && (
        <div className="HamburgerMenuDropdown">
          {options.map((option) => (
            <div className="HamburgerMenuDropdownRow" key={option[0]}>
              <Button text={option[0]} onClick={() => navigate(option[1])} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default HamburgerMenu;
