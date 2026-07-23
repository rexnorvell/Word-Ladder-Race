import TextBlock from "../TextBlock/TextBlock";
import "./Alert.css";

interface Props {
  text: string;
  type: "success" | "warning" | "error";
}

function Alert({ text, type }: Props) {
  return (
    <div className={`AlertContainer Alert--${type}`}>
      <TextBlock size={5}>{text}</TextBlock>
    </div>
  );
}

export default Alert;
