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

  input UpdateChapterInput {
    title: String
    order: Int
    content: String
  }

  input GetChaptersInput {
    from: Int
    limit: Int
  }

  type Chapters {
    chapters: [Chapter]
    total: Int!
    nextOrder: Int
  }

  type Query {
    getChapters(input: GetChaptersInput): Chapters
    getNthChapter(order: Int!): Chapter
  }

  type Mutation {
    addChapter(input: AddChapterInput): Chapter
    updateChapter(id: Int!, input: UpdateChapterInput): Chapter
  }
`;
