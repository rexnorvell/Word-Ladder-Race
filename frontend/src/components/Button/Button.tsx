import type { ReactNode } from "react";
import "./Button.css";

interface Props {
  text?: string;
  shadow?: boolean;
  icon?: ReactNode;
  color?: "primary" | "secondary" | "transparent";
  type?: "submit" | "reset" | "button" | undefined;
  onClick?: () => void;
}

function Button({
  text,
  shadow = true,
  icon,
  color = "primary",
  type = "submit",
  onClick = () => {},
}: Props) {
  return (
    <button
      className={`Button Button--${color} ${shadow ? "Button--shadow" : ""}`}
      onClick={onClick}
      type={type}
    >
      {icon}
      {text}
    </button>
  );
}

export default Button;
