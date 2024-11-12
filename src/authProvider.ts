import type { AuthProvider } from "@refinedev/core";
import { getClient } from "./util/client";
import { signinMutation } from "./util/graphql/auth";
import Cookies from "js-cookie";

export const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

type AuthActionResponse = {
  success: boolean;
  redirectTo: string;
};

type AuthRequestResponse = {
  signin: {
    token: string;
  };
};

type LoginRequestType = {
  email: string;
  password: string;
};

export const authProvider: AuthProvider = {
  login: async ({
    email,
    password,
  }: LoginRequestType): Promise<AuthActionResponse> => {
    try {
      const result: AuthRequestResponse = await getClient(false).request(
        signinMutation,
        {
          email,
          password,
        }
      );
      const { token } = result.signin;

      if (!token) {
        return Promise.reject();
      }

      Cookies.set(TOKEN_KEY, token, {
        expires: 7,
        secure: true,
        sameSite: "Strict",
      });

      getClient(false);

      return { success: true, redirectTo: "/home" };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: async () => {
    Cookies.remove(TOKEN_KEY);

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = Cookies.get(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: "/login",
    };
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        id: 1,
        name: "John Doe",
        avatar: "https://i.pravatar.cc/300",
      };
    }
    return null;
  },
  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
