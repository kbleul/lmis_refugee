import { GraphQLClient } from "graphql-request";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_GRAPHQL_ENDPOINT;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

let client: GraphQLClient | null = null;


export const 
getClient = (reset: boolean, token?: string, ) => {
  if (reset) {
    client = new GraphQLClient(API_URL, {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const savedToken = Cookies.get(TOKEN_KEY);

  if (client) {
    if (savedToken || token) {
      client.setHeader(
        "Authorization",
        token ? `Bearer ${token}` : `Bearer ${savedToken}`
      );
    }
  } else {
    client = new GraphQLClient(
      API_URL,
      token || savedToken
        ? {
            headers: {
              "content-type": "application/json",
              Authorization: token ? `Bearer ${token}` : `Bearer ${savedToken}`,
            },
          }
        : {
            headers: {
              "content-type": "application/json",
            },
          }
    );
  }
  return client;
};
