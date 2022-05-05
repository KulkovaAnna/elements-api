import { gql } from 'apollo-server-core';

export default gql`
  enum Race {
    elf
    human
    goblin
    siren
    verwolf
  }

  type Character {
    id: Int!
    name: String
    description: String
    story: String
    hero_image: String
    images: [String]
    full_name: String
    race: Race
  }

  type Query {
    getCharacters: [Character]
    getCharacterById(id: Int!): Character
  }
`;
