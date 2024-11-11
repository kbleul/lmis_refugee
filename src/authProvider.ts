import type { AuthProvider } from "@refinedev/core";
import { getClient, getClientTwo } from "./util/client";
import { signinMutation } from "./util/graphql/auth";

export const TOKEN_KEY = "refine-auth";

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
  login: async ({
    email,
    password,
  }: LoginRequestType): Promise<AuthActionResponse> => {
    try {
      const result: AuthRequestResponse =  await getClientTwo().request(signinMutation, {
        email,
        password,
      });

      const {  token } = result.signin;

      localStorage.setItem(
        import.meta.env.VITE_TOKEN_KEY,
        token
      );
      

      getClient(false, );

      return { success: true, redirectTo: "/home" };
    } catch (error) {
      return Promise.reject(error);
    }
  },
  logout: async () => {
    localStorage.removeItem(import.meta.env.VITE_TOKEN_KEYimport.meta.env.VITE_TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);
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
    const token = localStorage.getItem(import.meta.env.VITE_TOKEN_KEYimport.meta.env.VITE_TOKEN_KEY);
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
