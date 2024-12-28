import { faker } from "@faker-js/faker";

const role = ["admin", "artist", "organize", "user"];

function getRandomItem(roles: string[]) {
  const randomIndex = Math.floor(Math.random() * roles.length);
  return roles[randomIndex];
}

const generatedEmails = new Set<string>();
const generatedUserIds = new Set<string>();
const generatedCityIds = new Set<string>();

function getUniqueEmail() {
  let email;
  do {
    email = faker.internet.email();
  } while (generatedEmails.has(email));
  generatedEmails.add(email);
  return email;
}

function getUniqueId() {
  let param: string;
  do {
    param = faker.string.uuid();
  } while (generatedUserIds.has(param));
  generatedCityIds.add(param);
  return param;
}

export function createRandomUser() {
  return {
    id: getUniqueId(),
    lastname: faker.person.lastName(),
    firstname: faker.person.firstName(),
    password: faker.internet.password(),
    email: getUniqueEmail(),
    pseudo: faker.person.firstName(),
    registeredAt: faker.date.past(),
    role: getRandomItem(role),
  };
}

export function createRandomPost() {
  return {
    id: getUniqueId(),
    title: faker.book.title(),
    subtitle: faker.lorem.lines(1),
    content: faker.lorem.lines(2),
    userId: faker.helpers.arrayElement(users).id,
  };
}

export function createRandomCity() {
  return {
    id: getUniqueId(),
    user_id: faker.helpers.arrayElement(users).id,
    city_name: faker.location.city(),
    address: faker.location.streetAddress(),
    text: faker.lorem.sentence(),
    zip_code: parseInt(faker.location.zipCode()),
    label: faker.commerce.productAdjective(),
    longitude: faker.location.longitude(),
    latitude: faker.location.latitude(),
    date: faker.date.past(),
    style: faker.color.human(),
    color: faker.color.rgb(),
    departement_number: faker.number.int({ min: 1, max: 95 }),
    region_name: faker.location.state(),
    url_point: faker.internet.url(),
  };
}

export const users = faker.helpers.multiple(createRandomUser, {
  count: 30,
});

export const posts = faker.helpers.multiple(createRandomPost, {
  count: 10,
});

export const cities = faker.helpers.multiple(createRandomCity, {
  count: 10,
});

export default {
  users,
  posts,
  cities,
};
