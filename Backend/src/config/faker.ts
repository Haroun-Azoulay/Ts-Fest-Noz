import { faker } from "@faker-js/faker";
import logger from "node-color-log";
import { v4 as uuidv4 } from "uuid";

// Don't remove you don't use generate uuid with faker because it's don't work !
let myuuid = uuidv4();

export async function retryDb<T>(fn: () => Promise<T>, retries = 30) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      logger.info(`${i}: try to mock the database.`);
      if (i === 0) logger.error(`You have an error with the faker.`);
      if (i === retries - 1) throw err;
    }
  }
}

const userUUIDs = Array.from({ length: 30 }, () => myuuid);
const postUUIDs = Array.from({ length: 30 }, () => myuuid);
const cityUUIDs = Array.from({ length: 30 }, () => myuuid);
const commentaryUUIDs = Array.from({ length: 10 }, () => myuuid);
const eventUUIDs = Array.from({ length: 10 }, () => myuuid);
const goodieTypeUUIDs = Array.from({ length: 30 }, () => myuuid);
const groupUUIDs = Array.from({ length: 30 }, () => myuuid);
const orderDetailUUIDs = Array.from({ length: 30 }, () => myuuid);
const orderUUIDs = Array.from({ length: 10 }, () => myuuid);
const goodieUUIDs = Array.from({ length: 10 }, () => myuuid);
const groupUserUUIDs = Array.from({ length: 10 }, () => myuuid);
const paymentUUIDs = Array.from({ length: 5 }, () => myuuid);
const artistProfilUUIDs = Array.from({ length: 10 }, () => myuuid);
const OrganizerProfilUUIDs = Array.from({ length: 10 }, () => myuuid);

export function createRandomUser(index: number) {
  return {
    id: userUUIDs[index],
    lastname: faker.person.lastName(),
    firstname: faker.person.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    pseudo: faker.person.firstName(),
    registeredAt: faker.date.past(),
    role: faker.helpers.arrayElement(["admin", "artist", "organizer", "user"]),
  };
}

export function createRandomPost(index: number) {
  return {
    id: postUUIDs[index],
    title: faker.book.title(),
    subtitle: faker.lorem.lines(1),
    content: faker.lorem.lines(2),
    userId: faker.helpers.arrayElement(userUUIDs),
  };
}

export function createRandomCity(index: number) {
  return {
    id: cityUUIDs[index],
    user_id: faker.helpers.arrayElement(userUUIDs),
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

export function createRandomCommentary(index: number) {
  return {
    id: commentaryUUIDs[index],
    content: faker.lorem.lines(1),
    postId: faker.helpers.arrayElement(postUUIDs),
    userId: faker.helpers.arrayElement(userUUIDs),
  };
}

export function createRandomEvent(index: number) {
  return {
    id: eventUUIDs[index],
    name: faker.person.firstName(),
    city_id: faker.helpers.arrayElement(cityUUIDs),
    user_id: faker.helpers.arrayElement(userUUIDs),
    description: faker.lorem.sentence(),
    url: faker.internet.url(),
    mapId: faker.number.int(100),
  };
}

export function createGoodieType(index: number) {
  return {
    id: goodieTypeUUIDs[index],
    name: faker.commerce.productAdjective(),
  };
}

export function createGroup(index: number) {
  return {
    id: groupUUIDs[index],
    name: faker.music.artist(),
  };
}

export function createGroupUser(index: number) {
  return {
    id: groupUserUUIDs[index],
    groupId: faker.helpers.arrayElement(groupUUIDs),
    userId: faker.helpers.arrayElement(userUUIDs),
  };
}

export function createGoodie(index: number) {
  return {
    id: goodieUUIDs[index],
    groupId: faker.helpers.arrayElement(groupUUIDs),
    userId: faker.helpers.arrayElement(userUUIDs),
    goodieTypeId: faker.helpers.arrayElement(goodieTypeUUIDs),
    name: faker.commerce.productName(),
    path: faker.image.dataUri({ type: "svg-base64" }),
    quantity: faker.number.int({ min: 1, max: 100 }),
    price: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
    available: faker.datatype.boolean(),
  };
}

export function createOrderDetail(index: number) {
  return {
    id: orderDetailUUIDs[index],
    goodieId: faker.helpers.arrayElement(goodieUUIDs),
    quantity: faker.number.int({ min: 1, max: 100 }),
    price: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
  };
}

export function createOrder(index: number) {
  return {
    id: orderUUIDs[index],
    userId: faker.helpers.arrayElement(userUUIDs),
    orderDetailId: faker.helpers.arrayElement(orderDetailUUIDs),
    totalPrice: faker.number.float({ min: 50, max: 1000, multipleOf: 0.02 }),
  };
}

export function createPayment(index: number) {
  return {
    id: paymentUUIDs[index],
    token: faker.string.alpha(20),
    payment: faker.datatype.boolean(),
    userId: faker.helpers.arrayElement(userUUIDs),
    eventId: eventUUIDs[index],
  };
}

export function createArtistProfil(index: number) {
  return {
    id: artistProfilUUIDs[index],
    denomination: faker.person.fullName().slice(0, 50),
    phone_number: faker.phone.number().slice(0, 20),
    url_media: faker.internet.url(),
    picture: faker.image.dataUri({ type: "svg-base64" }),
    SIRET_number: faker.number.int({
      min: 10000,
      max: 99999,
    }),
    userId: faker.helpers.arrayElement(userUUIDs),
  };
}
export function createOrganizerProfil(index: number) {
  return {
    id: OrganizerProfilUUIDs[index],
    denomination: faker.book.author(),
    phone_number: faker.phone.number(),
    full_adress: faker.location.secondaryAddress(),
    SIRET_number: faker.number.int({ min: 1000, max: 10000 }),
    more_info: faker.lorem.lines(),
    userId: faker.helpers.arrayElement(userUUIDs),
  };
}

export const users = Array.from({ length: 50 }, (_, index) =>
  createRandomUser(index),
);
export const posts = Array.from({ length: 50 }, (_, index) =>
  createRandomPost(index),
);
export const cities = Array.from({ length: 50 }, (_, index) =>
  createRandomCity(index),
);
export const commentaries = Array.from({ length: 5 }, (_, index) =>
  createRandomCommentary(index),
);
export const events = Array.from({ length: 5 }, (_, index) =>
  createRandomEvent(index),
);
export const goodieTypes = Array.from({ length: 5 }, (_, index) =>
  createGoodieType(index),
);
export const groups = Array.from({ length: 50 }, (_, index) =>
  createGroup(index),
);
export const groupUsers = Array.from({ length: 5 }, (_, index) =>
  createGroupUser(index),
);
export const goodies = Array.from({ length: 50 }, (_, index) =>
  createGoodie(index),
);
export const orderDetails = Array.from({ length: 10 }, (_, index) =>
  createOrderDetail(index),
);
export const orders = Array.from({ length: 5 }, (_, index) =>
  createOrder(index),
);

export const payments = Array.from({ length: 10 }, (_, index) =>
  createPayment(index),
);

export const artistProfils = Array.from({ length: 5 }, (_, index) =>
  createArtistProfil(index),
);

export const organizerProfils = Array.from({ length: 5 }, (_, index) =>
  createOrganizerProfil(index),
);

export default {
  users,
  posts,
  cities,
  commentaries,
  events,
  goodieTypes,
  groups,
  groupUsers,
  goodies,
  orderDetails,
  orders,
  payments,
  retryDb,
  artistProfils,
  organizerProfils,
};
