import type { ReactNode } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

interface Props {
  children: ReactNode;
}

function PublicRoute({ children }: Props) {
  const authContext = useAuth();
  if (authContext.loading) {
    return <LoadingSpinner />;
  } else if (authContext.user !== null) {
    return <Navigate to="/home" />;
  } else {
    return <>{children}</>;
  }
}

export default PublicRoute;
