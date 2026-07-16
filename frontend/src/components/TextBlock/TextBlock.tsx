import "./TextBlock.css";

interface Props {
  className?: string;
  text: string;
}

function TextBlock({ className, text }: Props) {
  return <div className={`TextBlock ${className}`}>{text}</div>;
}

export default TextBlock;
