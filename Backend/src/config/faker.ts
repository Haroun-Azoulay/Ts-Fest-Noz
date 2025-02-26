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

const frenchCities = [
  {
    city: "Paris",
    latitude: 48.8566,
    longitude: 2.3522,
    region: "Île-de-France",
    department: 75,
  },
  {
    city: "Marseille",
    latitude: 43.2965,
    longitude: 5.3698,
    region: "Provence-Alpes-Côte d'Azur",
    department: 13,
  },
  {
    city: "Lyon",
    latitude: 45.764,
    longitude: 4.8357,
    region: "Auvergne-Rhône-Alpes",
    department: 69,
  },
  {
    city: "Toulouse",
    latitude: 43.6047,
    longitude: 1.4442,
    region: "Occitanie",
    department: 31,
  },
  {
    city: "Nice",
    latitude: 43.7102,
    longitude: 7.262,
    region: "Provence-Alpes-Côte d'Azur",
    department: 6,
  },
  {
    city: "Nantes",
    latitude: 47.2184,
    longitude: -1.5536,
    region: "Pays de la Loire",
    department: 44,
  },
  {
    city: "Strasbourg",
    latitude: 48.5734,
    longitude: 7.7521,
    region: "Grand Est",
    department: 67,
  },
  {
    city: "Montpellier",
    latitude: 43.6119,
    longitude: 3.8772,
    region: "Occitanie",
    department: 34,
  },
  {
    city: "Bordeaux",
    latitude: 44.8378,
    longitude: -0.5792,
    region: "Nouvelle-Aquitaine",
    department: 33,
  },
  {
    city: "Lille",
    latitude: 50.6292,
    longitude: 3.0573,
    region: "Hauts-de-France",
    department: 59,
  },
];

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
  const randomIndex = faker.number.int({ min: 0, max: 9 });
  const cityData = frenchCities[randomIndex];
  return {
    id: cityUUIDs[index],
    user_id: faker.helpers.arrayElement(userUUIDs),
    city_name: cityData.city,
    address: faker.location.streetAddress(),
    text: faker.lorem.sentence(),
    zip_code: faker.number.int({ min: 10000, max: 99999 }),
    label: faker.commerce.productAdjective(),
    longitude: cityData.longitude,
    latitude: cityData.latitude,
    date: faker.date.past(),
    style: faker.color.human(),
    color: faker.color.rgb(),
    departement_number: cityData.department,
    region_name: cityData.region,
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
