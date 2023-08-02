import axios from "./api/axios";
import { string } from "yup";
import firebase from "../firebase";
import 'firebase/compat/auth';
import { signInWithEmailAndPassword } from "firebase/auth";

type LoginArgs = {
  password: string;
  username: string;
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
      firebase.auth().signInWithEmailAndPassword(args.username, args.password)
      .then((userCredential) => {
        // Successful login
        console.log('User logged in:', userCredential.user?.email);
      })
      .catch((error) => {
        // Handle login errors
        console.error('Error logging in:', error);
      });


      // const response = await axios.post("/login", {
      //   username: args.username,
      //   password: args.password,
      // });

      // const { data } = response;
      // const { token } = data;

      // localStorage.setItem("accessToken", "Bearer " + token);

      return;
    } catch (e) {
      throw new Error("Something went wrong");
    }
  };

  const register = async (args: RegistrationArgs) => {
    try {
      firebase.auth().createUserWithEmailAndPassword(args.email, args.password)
      .then((userCredential: any) => {
        // Successful signup
        const user = userCredential.user;
        console.log('User signed up:', user?.email);
      })


      // const response = await axios.post("/register", {
      //   email: args.email,
      //   username: args.username,
      //   password: args.password,
      // });

      // const { data } = response;
      // const { token } = data;

      // localStorage.setItem("accessToken", "Bearer " + token);

      // return response;
      return 1;
    } catch (e) {
      console.error(e)
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
