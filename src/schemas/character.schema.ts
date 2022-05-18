import { gql } from 'apollo-server-core';

export default gql`
  scalar Upload
  enum Race {
    elf
    human
    goblin
    siren
    verwolf
  }

  enum Sex {
    male
    female
    other
  }

  type Character {
    id: Int!
    name: String
    description: String
    story: String
    hero_image: String
    full_name: String
    race: Race
    sex: Sex
    birth_date: Int
    death_date: Int
  }

  type Query {
    getCharacters: [Character]
    getCharacterById(id: Int!): Character
  }

  type Mutation {
    uploadHeroImage(id: Int!, file: Upload!): Character
  }
`;
