import { gql } from 'apollo-server-core';

export default gql`
  type Chapter {
    id: Int!
    title: String
    order: Int!
    content: String
  }

  input AddChapterInput {
    title: String
    order: Int!
    content: String
  }

  type Query {
    getChapters: [Chapter]
    getNthChapter(order: Int!): Chapter
  }

  type Mutation {
    addChapter(input: AddChapterInput): Chapter
    updateChapter(id: Int!, input: AddChapterInput): Chapter
  }
`;
