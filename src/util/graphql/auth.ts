import { gql } from "graphql-request";

export const signinMutation = gql`
  mutation SignIn($email: String!, $password: String!) {
    signin(params: { email: $email, password: $password }) {
      token
      error
    }
  }
`;
