// import { useAuth } from "@hooks/useAuth";
import { imgBasePath } from "@utils/imgs";
import { paths } from "@utils/paths";
import { ReactElement, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { LogoutConfirmationModal } from "./LogoutConfirmationModal/LogoutConfirmationModal";
import { NotebookWidget } from "./NotebookWidget/NotebookWidget";
import { Logout } from "./Protected.styled";
import { useAuth } from "@AuthContext";

const Protected = (): ReactElement => {
  const [isVisible, setIsVisible] = useState(false);
  const { user, loading } = useAuth();

  if (loading) return <h1>Loading</h1>
  if (!user) {
    return <Navigate replace to={paths.login} />;
  }

  return (
    <div>
      <NotebookWidget />
      <Logout
        imgSrc={imgBasePath + "/logout.svg"}
        onClick={() => setIsVisible(true)}
      />
      {/* {isVisible && (
        <LogoutConfirmationModal
          onSessionStateChange={setSessionState}
          onVisibilityChange={setIsVisible}
        />
      )} */}
      <Outlet />
    </div>
  );
};

export default Protected;
