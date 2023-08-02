import axios from "./api/axios";
import { string } from "yup";
import firebase from "../firebase";
import 'firebase/compat/auth';
import { signInWithEmailAndPassword } from "firebase/auth";

type LoginArgs = {
  password: string;
  email: string;
};

type RegistrationArgs = {
  email: string;
  password: string;
  username: string;
};

type ResetPasswordArgs = {
  newPassword: string;
  newPasswordRepeat: string;
  token: string;
};

const sessionServiceDef = () => {
  const login = async (args: LoginArgs) => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(args.email, args.password);
      // Successful login
      console.log('User logged in:', userCredential.user?.email);
      return userCredential;
    } catch (e) {
      throw new Error("Something went wrong");
    }
  };

  const register = async (args: RegistrationArgs) => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(args.email, args.password);
      // Successful signup
      const user = userCredential.user;
      console.log('User signed up:', user?.email);
      return 1;
    } catch (error) {
      console.error(error);
      throw new Error("Something went wrong");
    }
  };
  

  const forgotPassword = async (email: string) => {
    try {
      const response = await axios.post("/forgotPassword", {
        email,
      });

      return response;
    } catch (e) {
      throw new Error("Something went wrong");
    }
  };

  const resetPassword = async (args: ResetPasswordArgs) => {
    const response = await axios.patch(`/resetPassword/${args.token}`, {
      password: args.newPassword,
      passwordConfirm: args.newPasswordRepeat,
    });
    return response;
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get("/refreshToken");

      const { data } = response;
      const { token } = data;

      localStorage.setItem("accessToken", "Bearer " + token);

      return response;
    } catch (e) {
      localStorage.removeItem("accessToken");
      window.dispatchEvent(new Event("storage"));
    }
  };

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
    refreshToken,
  };
};

export const sessionService = sessionServiceDef();
