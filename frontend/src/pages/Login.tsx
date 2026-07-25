import HeaderBar from "../components/HeaderBar/HeaderBar";
import AuthForm from "../components/AuthForm/AuthForm";
import { login } from "../services/api";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert/Alert";
import { useState } from "react";
import type { AlertInfo } from "../types/AlertInfo";

interface Props {}

function Login({}: Props) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<AlertInfo>();

  async function handleLogin(username: string, password: string) {
    try {
      await login({ username, password });
      setAlert({ message: "Success!", type: "success" });
      navigate("/home");
    } catch (error) {
      setAlert({ message: `${error}`, type: "error" });
    }
  }

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        <AuthForm
          buttonText="Log In"
          title="Log In"
          usernamePlaceholder="Enter username"
          firstPasswordPlaceholder="Enter password"
          onSubmit={handleLogin}
        />
        {alert && <Alert text={alert.message} type={alert.type} />}
      </div>
    </div>
  );
}

export default Login;
