import type { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import TextBlock from "../TextBlock/TextBlock";

interface Props {
  children: ReactNode;
}

function ProtectedRoute({ children }: Props) {
  const authContext = useAuth();
  if (authContext.loading) {
    return <TextBlock size={5}>Loading...</TextBlock>;
  } else if (authContext.user === null) {
    return <Navigate to="/home" />;
  } else {
    return <>{children}</>;
  }
}

export default ProtectedRoute;
