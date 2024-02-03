import { faker } from "@faker-js/faker";
import { Person } from "./types";

const getNewPerson = (): Person => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
  };
};

export function makeData(size: number) {
  return new Array(size).fill(null).map(() => {
    return getNewPerson();
  });
}
