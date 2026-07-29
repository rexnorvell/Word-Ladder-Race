import HeaderBar from "../components/HeaderBar/HeaderBar";
import TextBlock from "../components/TextBlock/TextBlock";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface Props {}

function Account({}: Props) {
  const navigate = useNavigate();
  const authContext = useAuth();

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        <TextBlock size={5}>
          Username: <strong>{authContext.user}</strong>
        </TextBlock>
        <Button
          text="Sign Out"
          onClick={() => {
            authContext.logout();
            navigate("/home");
          }}
        />
      </div>
    </div>
  );
}

export default Account;
