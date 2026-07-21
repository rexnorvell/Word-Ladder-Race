import type { ReactNode } from "react";
import "./PopUp.css";

interface Props {
  children: ReactNode;
}

function PopUp({ children }: Props) {
  return <div className="PopUpContainer">{children}</div>;
}

export default PopUp;
