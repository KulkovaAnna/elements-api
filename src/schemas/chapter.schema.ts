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

  type GetChaptersResult {
    chapters: [Chapter]
    total: Int!
    nextOrder: Int
  }

  type GetNthChapterResult {
    chapter: Chapter
    next: Int
    prev: Int
    total: Int
  }

  type StatusResponse {
    status: String
  }

  type Query {
    getNthChapter(order: Int!): GetNthChapterResult
    getChapters(input: GetChaptersInput): GetChaptersResult
    getChapterById(id: Int!): GetNthChapterResult 
  }

  type Mutation {
    addChapter(input: AddChapterInput): Chapter
    updateChapter(id: Int!, input: UpdateChapterInput): Chapter
    deleteChapter(id: Int!): StatusResponse
  }
`;
