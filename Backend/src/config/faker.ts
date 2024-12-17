import { faker } from "@faker-js/faker";

const role = ["admin", "artist", "organize", "user"];

function getRandomItem(roles: string[]) {
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
}

const generatedEmails = new Set<string>();
const generatedUserIds = new Set<string>();

function getUniqueEmail() {
  let email;
  do {
    email = faker.internet.email();
  } while (generatedEmails.has(email));
  generatedEmails.add(email);
  return email;
}

function getUniqueUserId() {
  let userId;
  do {
    userId = faker.string.uuid();
  } while (generatedUserIds.has(userId));
  generatedUserIds.add(userId);
  return userId;
}

export function createRandomUser() {
  return {
    userId: getUniqueUserId(),
    lastname: faker.person.lastName(),
    firstname: faker.person.firstName(),
    password: faker.internet.password(),
    email: getUniqueEmail(),
    pseudo: faker.person.firstName(),
    registeredAt: faker.date.past(),
    role: getRandomItem(role),
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 50,
});

console.log(users);

export default {
  users,
};
