import type { AuthProvider } from "@refinedev/core";
import { getClientTwo } from "./util/client";
import { signinMutation } from "./util/graphql/auth";

export const TOKEN_KEY = "refine-auth";

type LoginRequestType = {
  email: string;
  password: string;
};

export const loginRequest = async ({
  email,
  password,
}: LoginRequestType) => {
  try {
    await getClientTwo().request(signinMutation, {
      email,
      password,
    });

    return { success: "success" };
  } catch (error: any) {
    return { error: error?.message };
  }
};
export const authProvider: AuthProvider = {
  login: async ({ username, email, password }) => {
    if ((username || email) && password) {
      localStorage.setItem(TOKEN_KEY, username);
      return {
        success: true,
        redirectTo: "/",
      };
    }

    return {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
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