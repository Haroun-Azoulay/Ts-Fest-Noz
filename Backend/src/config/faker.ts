import { faker, fakerFR } from "@faker-js/faker";
import logger from "node-color-log";
import { v4 as uuidv4 } from "uuid";

// Don't remove you don't use generate uuid with faker because it's don't work !
let myuuid = uuidv4();

export async function retryDb<T>(fn: () => Promise<T>, retries = 10) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      logger.info(`${i}: Try to mock the database.`);
      if (i === 0) logger.error(`You have an error with the faker.`);
      if (i === retries - 1) throw err;
    }
  }
}

const userUUIDs = Array.from({ length: 10 }, () => uuidv4());
const postUUIDs = Array.from({ length: 10 }, () => uuidv4());
const cityUUIDs = Array.from({ length: 10 }, () => uuidv4());
const commentaryUUIDs = Array.from({ length: 10 }, () => uuidv4());
const eventUUIDs = Array.from({ length: 10 }, () => uuidv4());
const goodieTypeUUIDs = Array.from({ length: 10 }, () => uuidv4());
const groupUUIDs = Array.from({ length: 10 }, () => uuidv4());
const orderDetailUUIDs = Array.from({ length: 10 }, () => uuidv4());
const orderUUIDs = Array.from({ length: 10 }, () => uuidv4());
const goodieUUIDs = Array.from({ length: 10 }, () => uuidv4());
const groupUserUUIDs = Array.from({ length: 10 }, () => uuidv4());
const paymentUUIDs = Array.from({ length: 10 }, () => uuidv4());
const artistProfilUUIDs = Array.from({ length: 10 }, () => uuidv4());
const OrganizerProfilUUIDs = Array.from({ length: 10 }, () => uuidv4());

type City = {
  city_name: string;
  latitude: number;
  longitude: number;
};

const citiesFaker: City[] = [
  { city_name: "Paris", latitude: 48.8566, longitude: 2.3522 },
  { city_name: "Lyon", latitude: 45.75, longitude: 4.85 },
  { city_name: "Marseille", latitude: 43.2965, longitude: 5.3698 },
  { city_name: "Toulouse", latitude: 43.6047, longitude: 1.4442 },
  { city_name: "Nice", latitude: 43.7102, longitude: 7.262 },
  { city_name: "Bordeaux", latitude: 44.8378, longitude: -0.5792 },
  { city_name: "Lille", latitude: 50.6292, longitude: 3.0573 },
  { city_name: "Strasbourg", latitude: 48.5734, longitude: 7.7521 },
  { city_name: "Nantes", latitude: 47.2186, longitude: -1.5541 },
  { city_name: "Montpellier", latitude: 43.6111, longitude: 3.8767 },
  { city_name: "Rennes", latitude: 48.1173, longitude: -1.6778 },
  { city_name: "Le Havre", latitude: 49.4937, longitude: 0.1079 },
  { city_name: "Reims", latitude: 49.2583, longitude: 4.0317 },
  { city_name: "Saint-Étienne", latitude: 45.4397, longitude: 4.3872 },
  { city_name: "Le Mans", latitude: 48.0061, longitude: 0.1996 },
  { city_name: "Aix-en-Provence", latitude: 43.5297, longitude: 5.4474 },
  { city_name: "Clermont-Ferrand", latitude: 45.7772, longitude: 3.087 },
  { city_name: "Toulon", latitude: 43.1242, longitude: 5.928 },
  { city_name: "Angers", latitude: 47.4784, longitude: -0.5632 },
  { city_name: "Dijon", latitude: 47.322, longitude: 5.0415 },
  { city_name: "Caen", latitude: 49.4144, longitude: -0.6921 },
  { city_name: "Nîmes", latitude: 43.8342, longitude: 4.3601 },
  { city_name: "Perpignan", latitude: 42.6987, longitude: 2.8956 },
  { city_name: "Tours", latitude: 47.3445, longitude: 0.7011 },
  { city_name: "Brest", latitude: 48.3904, longitude: -4.4861 },
  { city_name: "La Rochelle", latitude: 46.1603, longitude: -1.1511 },
  { city_name: "Antibes", latitude: 43.58, longitude: 7.125 },
  { city_name: "Chambéry", latitude: 45.5646, longitude: 5.915 },
  { city_name: "Ajaccio", latitude: 41.9192, longitude: 8.7386 },
  { city_name: "Biarritz", latitude: 43.4833, longitude: -1.5597 },
  { city_name: "Lorient", latitude: 47.7485, longitude: -3.3676 },
];

class RandomUtils {
  private static getRandomElement<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  static getRandomCoordinate(citiesFaker: City[]): City {
    return this.getRandomElement(citiesFaker);
  }
}

export function createRandomUser(index: number) {
  return {
    id: userUUIDs[index],
    lastname: faker.person.lastName(),
    firstname: faker.person.firstName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    city: fakerFR.location.city(),
    latitude: fakerFR.location.latitude(),
    longitude: fakerFR.location.longitude(),
    pseudo: faker.person.firstName(),
    registeredAt: faker.date.past(),
    role: faker.helpers.arrayElement(["admin", "artist", "organize", "user"]),
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
  const randomCoordinate = RandomUtils.getRandomCoordinate(citiesFaker);
  return {
    id: cityUUIDs[index],
    user_id: faker.helpers.arrayElement(userUUIDs),
    city_name: randomCoordinate.city_name,
    address: faker.location.streetAddress(),
    text: faker.lorem.sentence(),
    zip_code: parseInt(faker.location.zipCode()),
    label: faker.commerce.productAdjective(),
    // It´s error i don't have time to swap name before
    longitude: randomCoordinate.latitude,
    latitude: randomCoordinate.longitude,
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
    denomination: faker.book.author().slice(0, 100),
    phone_number: faker.phone.number(),
    full_adress: faker.location.secondaryAddress().slice(0, 255),
    SIRET_number: faker.number.int({ min: 1000, max: 10000 }),
    more_info: faker.lorem.lines().slice(0, 100),
    userId: faker.helpers.arrayElement(userUUIDs),
  };
}

export const users = Array.from({ length: 40 }, (_, index) =>
  createRandomUser(index),
);
export const posts = Array.from({ length: 10 }, (_, index) =>
  createRandomPost(index),
);
export const cities = Array.from({ length: 10 }, (_, index) =>
  createRandomCity(index),
);
export const commentaries = Array.from({ length: 10 }, (_, index) =>
  createRandomCommentary(index),
);
export const events = Array.from({ length: 10 }, (_, index) =>
  createRandomEvent(index),
);
export const goodieTypes = Array.from({ length: 10 }, (_, index) =>
  createGoodieType(index),
);
export const groups = Array.from({ length: 10 }, (_, index) =>
  createGroup(index),
);
export const groupUsers = Array.from({ length: 10 }, (_, index) =>
  createGroupUser(index),
);
export const goodies = Array.from({ length: 10 }, (_, index) =>
  createGoodie(index),
);
export const orderDetails = Array.from({ length: 10 }, (_, index) =>
  createOrderDetail(index),
);
export const orders = Array.from({ length: 10 }, (_, index) =>
  createOrder(index),
);

export const payments = Array.from({ length: 10 }, (_, index) =>
  createPayment(index),
);

export const artistProfils = Array.from({ length: 10 }, (_, index) =>
  createArtistProfil(index),
);

export const organizerProfils = Array.from({ length: 10 }, (_, index) =>
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
