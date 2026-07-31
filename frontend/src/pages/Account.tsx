import HeaderBar from "../components/HeaderBar/HeaderBar";
import TextBlock from "../components/TextBlock/TextBlock";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import { getAccountInfo } from "../services/api";
import type { AlertInfo } from "../types/AlertInfo";
import Alert from "../components/Alert/Alert";

interface Props {}

interface AccountInfo {
  personal_best: number | null;
  rank: number | null;
  num_entries: number;
}

function Account({}: Props) {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | undefined>(
    undefined,
  );
  const [alert, setAlert] = useState<AlertInfo>();

  useEffect(() => {
    async function loadAccountInfo() {
      try {
        const data = await getAccountInfo();
        setAccountInfo(data);
      } catch (err) {
        setAlert({
          message: `${err}`,
          type: "error",
        });
        console.error(err);
      }
    }

    loadAccountInfo();
  }, []);

  const navigate = useNavigate();
  const authContext = useAuth();

  const usernameComponent = (alert || accountInfo !== undefined) && (
    <TextBlock size={5} fadeIn={true}>
      Username: <strong>{authContext.user}</strong>
    </TextBlock>
  );

  const personalBestComponent = accountInfo !== undefined && (
    <TextBlock size={5} fadeIn={true}>
      Personal Best:{" "}
      <strong>
        {accountInfo.personal_best !== null
          ? `${accountInfo.personal_best / 1000} s`
          : "No times recorded"}
      </strong>
    </TextBlock>
  );

  const rankComponent = accountInfo !== undefined && (
    <TextBlock size={5} fadeIn={true}>
      Rank:{" "}
      {accountInfo.rank !== null ? (
        <>
          <strong>{accountInfo.rank} </strong> of{" "}
          <strong> {accountInfo.num_entries}</strong>
        </>
      ) : (
        <strong>Unranked</strong>
      )}
    </TextBlock>
  );

  const signOutButton = (alert || accountInfo !== undefined) && (
    <Button
      text="Sign Out"
      onClick={() => {
        authContext.logout();
        navigate("/home");
      }}
      fadeIn={true}
    />
  );

  return (
    <div className="App">
      <HeaderBar />
      <div className="PageContent">
        {usernameComponent}
        {personalBestComponent}
        {rankComponent}
        {alert && <Alert text={alert.message} type={alert.type} />}
        {signOutButton}
      </div>
    </div>
  );
}

export default Account;
