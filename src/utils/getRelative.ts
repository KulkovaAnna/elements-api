import { RelationType, Sex } from "../types/models";

  export default function getRelative(mainCharSex: Sex, relation: RelationType) {
    switch (relation) {
      case RelationType.aunt:
      case RelationType.uncle:
        switch (mainCharSex) {
          case Sex.female:
            return RelationType.niece;
          default:
            return RelationType.nephew
        }
      case RelationType.brother:
      case RelationType.sister:
        switch (mainCharSex) {
          case Sex.female:
            return RelationType.sister;
         default:
            return RelationType.brother
        }
      case RelationType.daughter:
      case RelationType.son:
        switch (mainCharSex) {
          case Sex.female:
            return RelationType.mother;
          default:
            return RelationType.father
        }
      case RelationType.father:
      case RelationType.mother:
        switch (mainCharSex) {
          case Sex.female:
            return RelationType.daughter;
          default:
            return RelationType.son
        }
      case RelationType.granddaughter:
      case RelationType.grandson:
        switch (mainCharSex) {
          case Sex.female:
            return RelationType.grandmother;
          default:
            return RelationType.grandfather
        }
      case RelationType.grandfather:
      case RelationType.grandmother:
        switch (mainCharSex) {
          case Sex.female:
            return RelationType.granddaughter;
          default:
            return RelationType.grandson
        }
      case RelationType.husband:
      case RelationType.wife:
        switch (mainCharSex) {
          case Sex.female:
            return RelationType.wife;
          default:
            return RelationType.husband
        }
      case RelationType.nephew:
      case RelationType.niece:
        switch (mainCharSex) {
          case Sex.female:
            return RelationType.aunt;
          default:
            return RelationType.uncle
        }
      case RelationType.stepdaughter:
      case RelationType.stepson:
        switch (mainCharSex) {
          case Sex.female:
            return RelationType.stepmother;
         default:
            return RelationType.stepfather
        }
      case RelationType.stepfather:
      case RelationType.stepmother:
       switch (mainCharSex) {
          case Sex.female:
            return RelationType.stepdaughter;
          default:
            return RelationType.stepson
        }
    }
  }