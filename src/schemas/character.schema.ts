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

  enum Relationship {
    sister
    brother
    mother
    father
    wife
    husband
    son
    daughter
    grandmother
    grandfather
    grandson
    granddaughter
    uncle
    aunt
    nephew
    niece
    stepmother
    stepfather
    stepson
    stepdaughter
  }

  type Family {
    id: Int!
    name: String
    related_as: Relationship
    relative_id: Int!
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
    family: [Family]
  }

  type Query {
    getCharacters: [Character]
    getCharacterById(id: Int!): Character
  }

  type Mutation {
    uploadHeroImage(id: Int!, file: Upload!): Character
  }
`;
