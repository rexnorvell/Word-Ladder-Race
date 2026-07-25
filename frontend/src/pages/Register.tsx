import HeaderBar from "../components/HeaderBar/HeaderBar";
import AuthForm from "../components/AuthForm/AuthForm";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert/Alert";
import { useState } from "react";
import type { AlertInfo } from "../types/AlertInfo";

interface Props {}

function Register({}: Props) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<AlertInfo>();

  async function handleRegister(
    username: string,
    firstPassword: string,
    secondPassword?: string,
  ) {
    if (firstPassword !== secondPassword) {
      setAlert({ message: "Warning: Passwords must match", type: "warning" });
      return;
    }
    try {
      await register({ username, password: firstPassword });
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
          buttonText="Register"
          title="Register"
          usernamePlaceholder="Enter a unique username"
          firstPasswordPlaceholder="Enter a secure password"
          secondPasswordPlaceholder="Confirm your password"
          onSubmit={handleRegister}
        />
        {alert && <Alert text={alert.message} type={alert.type} />}
      </div>
    </div>
  );
}

export default Register;
