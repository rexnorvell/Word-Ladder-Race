import HeaderBar from "../components/HeaderBar/HeaderBar";
import Form from "../components/Form/Form";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";

interface Props {}

function Login({}: Props) {
  const navigate = useNavigate();

  async function handleLogin(username: string, password: string) {
    try {
      await login({ username, password });
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  }

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        <Form title="Log In" onSubmit={handleLogin} />
      </div>
    </div>
  );
}

export default Login;
