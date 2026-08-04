import "./LoadingSpinner.css";

interface Props {}

function LoadingSpinner({}: Props) {
  return (
    <div className="LoadingSpinnerContainer">
      <span className="LoadingSpinner" />
    </div>
  );
}

export default LoadingSpinner;
