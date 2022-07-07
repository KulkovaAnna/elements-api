export enum RelationType {
  sister = 'sister',
  brother = 'brother',
  mother = 'mother',
  father = 'father',
  wife = 'wife',
  husband = 'husband',
  son = 'son',
  daughter = 'daughter',
  grandmother = 'grandmother',
  grandfather = 'grandfather',
  grandson = 'grandson',
  granddaughter = 'granddaughter',
  uncle = 'uncle',
  aunt = 'aunt',
  nephew = 'nephew',
  niece = 'niece',
  stepmother = 'stepmother',
  stepfather = 'stepfather',
  stepson = 'stepson',
  stepdaughter = 'stepdaughter',
}

export enum Race {
  elf = 'elf',
  human = 'human',
  goblin = 'goblin',
  siren = 'siren',
  verwolf = 'verwolf',
}

export enum Sex {
  male = 'male',
  female = 'female',
  other = 'other',
}

export interface User {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
}

export interface Chapter {
  id: number;
  order: number;
  title: string;
  content: string;
}

export enum Role {
  protagonist = 'protagonist',
  main = 'main',
  minor = 'minor',
}

export type Family = {
  id: number;
  relative_id: number;
  char_id: number;
  related_as?: RelationType;
};

export interface Character {
  id: number;
  name?: string;
  description?: string;
  story?: string;
  hero_image?: string;
  thumbnail_image?: string;
  full_name?: string;
  race?: Race;
  sex?: Sex;
  birth_date?: number;
  death_date?: number;
  role?: Role;
}

export interface Relationship {
  id: number;
  char_id: number;
  related_char_id: number;
  related_as: string;
}
