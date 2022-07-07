import { gql } from "apollo-server-core";

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

  enum ImageType {
    hero
    thumbnail
  }

  enum Role {
    protagonist
    main
    minor
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
    thumbnail_image: String
    full_name: String
    race: Race
    sex: Sex
    birth_date: Int
    death_date: Int
    family: [Family]
    role: Role
  }

  input MainCharInfoInput {
    name: String
    description: String
    story: String
    full_name: String
    race: Race
    sex: Sex
    birth_date: Int
    death_date: Int
    role: Role
  }

  input CharImagesInput {
    thumbnail: Upload
    hero: Upload
  }

  input CharFamilyInput {
    id: Int
    related_as: Relationship!
    relative_id: Int!
  }

  type Query {
    getCharacters: [Character]
    getCharacterById(id: Int!): Character
  }

  type Mutation {
    uploadImage(id: Int!, file: Upload!, type: ImageType!): Character
    addCharacter(
      main_info: MainCharInfoInput!
      images: CharImagesInput
      family: [CharFamilyInput]
    ): Character
    updateCharacter(
      id: Int!
      main_info: MainCharInfoInput!
      images: CharImagesInput
      family: [CharFamilyInput]
    ): Character
    deleteCharacter(id: Int!): StatusResponse
  }
`;
