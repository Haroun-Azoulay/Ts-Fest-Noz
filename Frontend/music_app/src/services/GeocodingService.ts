import axios from 'axios';


const BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const ACCESS_TOKEN: string = "pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNtNjgwYTgwdzA4em0ycnFyczM2bXR2ZXgifQ.NNk_nOdxatVzztXUH1yIKA";


interface GeocodeResult {
  latitude: number;
  longitude: number;
  streetAddress: string;
  postalCode: string;
  city: string;
  country: string;
  place: string;
}

interface MapboxFeature {
  center: [number, number];
  place_name: string;
}


const parsePlaceName = (placeName: string): Partial<GeocodeResult> => {
  const streetRegex = /^(\d+)/;
  const postalCodeRegex = /\b\d{5}\b/;
  const cityRegex = /\b\d{5}\s+([A-Z][a-zA-ZÀ-ÿ\s'-]+)\b/;
  const countryRegex = /\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)?(?:\s[A-Z][a-z]+)?\b$/;
  const placeRegex = /^.*?,/;

  const streetMatch = placeName.match(streetRegex);
  const postalCodeMatch = placeName.match(postalCodeRegex);
  const cityMatch = String(placeName.match(cityRegex)).split(',')[1];
  const countryMatch = placeName.match(countryRegex);
  const placeMatch = placeName.match(placeRegex);

  const streetAddress = streetMatch ? streetMatch[1].trim() : '';
  const postalCode = postalCodeMatch ? postalCodeMatch[0] : '';
  const city = cityMatch ? cityMatch : '';
  const country = countryMatch ? countryMatch[0] : '';
  const place = placeMatch ? placeMatch[0] : '';

  return { streetAddress, postalCode, city, country, place };
};


const geocodeAddress = async (geocoding_address: string): Promise<GeocodeResult> => {
  try {
    const response = await axios.get(`${BASE_URL}${encodeURIComponent(geocoding_address)}.json`, {
      params: {
        proximity: '-73.990593,40.740121',
        access_token: ACCESS_TOKEN,
      },
    });

    const features: MapboxFeature[] = response.data.features;
    if (features.length > 0) {
      const { center, place_name } = features[0];
      const { streetAddress, postalCode, city, country, place } = parsePlaceName(place_name);
      const [longitude, latitude] = center;

      return { latitude, longitude, streetAddress, postalCode, city, country, place } as GeocodeResult;
    }

    throw new Error('Adresse non trouvée');
  } catch (error) {
    throw new Error('Erreur lors de la récupération des données de géocodage : ' + error);
  }
};


const geocodeAddressByPlace = async (geocoding_address: string): Promise<GeocodeResult> => {
  try {
    const response = await axios.get(`${BASE_URL}${encodeURIComponent(geocoding_address)}.json`, {
      params: {
        types: 'place',
        country: 'fr',
        access_token: ACCESS_TOKEN,
      },
    });

    const features: MapboxFeature[] = response.data.features;
    if (features.length > 0) {
      const { center, place_name } = features[0];
      const { streetAddress, postalCode, city, country, place } = parsePlaceName(place_name);
      const [longitude, latitude] = center;

      return { latitude, longitude, streetAddress, postalCode, city, country, place } as GeocodeResult;
    }

    throw new Error('Adresse non trouvée');
  } catch (error) {
    throw new Error('Erreur lors de la récupération des données de géocodage : ' + error);
  }
};


export { geocodeAddress, geocodeAddressByPlace };
