import { gql } from 'apollo-server-core';

export default gql`
  type User {
    id: Int!
    email: String!
    isAdmin: Boolean!
  }

  type Query {
    signIn(email: String!, password: String!): String!
  }

  type Mutation {
    signUp(email: String!, password: String!): String!
  }
`;
