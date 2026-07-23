import { useEffect, useState } from "react";
import HeaderBar from "../components/HeaderBar/HeaderBar";
import { getUser, logout } from "../services/api";
import TextBlock from "../components/TextBlock/TextBlock";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

interface Props {}

function Account({}: Props) {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const user = await getUser();
      setUsername(user.username);
    } catch (err) {
      console.error(err);
    }
  }

  async function signOut() {
    try {
      await logout();
      navigate("/home");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        <TextBlock size={5}>
          Username: <strong>{username}</strong>
        </TextBlock>
        <Button text="Sign Out" onClick={signOut} />
      </div>
    </div>
  );
}

export default Account;
