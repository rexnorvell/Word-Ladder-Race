import HeaderBar from "../components/HeaderBar/HeaderBar";
import Form from "../components/Form/Form";
import { register } from "../services/api";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert/Alert";
import { useState } from "react";
import type { AlertInfo } from "../types/AlertInfo";

interface Props {}

function Register({}: Props) {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<AlertInfo>();

  async function handleRegister(username: string, password: string) {
    try {
      await register({ username, password });
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
        <Form title="Register" onSubmit={handleRegister} />
        {alert && <Alert text={alert.message} type={alert.type} />}
      </div>
    </div>
  );
}

export default Register;
