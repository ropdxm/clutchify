// import { useAuth } from "@hooks/useAuth";
import { imgBasePath } from "@utils/imgs";
import { paths } from "@utils/paths";
import { ReactElement, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Logout } from "./Protected.styled";
import { useAuth } from "@AuthContext";
import ChatApp from '../../components/App/ChatApp';

const Protected = (): ReactElement => {
  const { user, loading, logout } = useAuth();

  if (loading) return <h1>Loading</h1>
  if (!user) {
    return <Navigate replace to={paths.login} />;
  }

  return (
    <div>
      <Logout
        imgSrc={imgBasePath + "/logout.svg"}
        onClick={() => logout()}
      />
      {/* {isVisible && (
        <LogoutConfirmationModal
          onSessionStateChange={setSessionState}
          onVisibilityChange={setIsVisible}
        />
      )} */}

      <ChatApp />
      

    </div>
  );
};

export default Protected;
