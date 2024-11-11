import { GraphQLClient } from "graphql-request";

const API_URL = import.meta.env.VITE_GRAPHQL_ENDPOINT;

let client: GraphQLClient | null = null;

export const getClientTwo = () => {
  return new GraphQLClient(API_URL, {
    headers: {
      "content-type": "application/json",
      "x-hasura-admin-secret": import.meta.env.VITE_HASURA_ADMIN_KEY
    },
  });
}

export const getClient = (reset: boolean, token?: string, ) => {
  if (reset) {
    client = new GraphQLClient(API_URL, {
      headers: {
        "content-type": "application/json",
      },
    });
  }

  const savedToken = localStorage.getItem(import.meta.env.VITE_TOKEN_KEY);

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
