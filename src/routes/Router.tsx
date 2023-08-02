import { paths } from "@utils/paths";
import { lazy, ReactElement, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage/LandingPage";
import LoginPage from "./LoginPage/LoginPage";
import Protected from "./Protected/Protected";
import RegistrationPage from "./RegistrationPage/RegistrationPage";
import ResetPasswordPage from "./ResetPasswordPage/ResetPasswordPage";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Courses from "./Courses/Courses";

export const Router = (): ReactElement => {
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          const uid = user.uid;
          // ...
          console.log("uid", uid)
        } else {
          // User is signed out
          // ...
          console.log("user is logged out")
        }
      });
     
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LandingPage />} path={paths.root} />
        <Route element={<Protected />} path={paths.app}>
          <Route element={<Courses />} index />
        </Route>
        <Route element={<LoginPage />} path={paths.login} />
        <Route element={<RegistrationPage />} path={paths.register} />
        <Route element={<ResetPasswordPage />} path={paths.resetPassword} />
      </Routes>
    </BrowserRouter>
  );
};
