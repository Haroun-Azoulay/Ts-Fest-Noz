import axios from 'axios';

const BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN; 
const parsePlaceName = (placeName) => {

  const streetRegex = /^(\d+)/;
  const postalCodeRegex = /\b\d{5}\b/;
  const cityRegex = /\b[A-Z][a-z]+(?:(?:\s|-)[A-Z][a-z]+){1,5}\b/;
  const countryRegex = /\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)?(?:\s[A-Z][a-z]+)?\b$/;
  const placeRegex = /^.*?,/;

  const streetMatch = placeName.match(streetRegex);
  const postalCodeMatch = placeName.match(postalCodeRegex);
  const cityMatch = placeName.match(cityRegex);
  const countryMatch = placeName.match(countryRegex);
  const placeMatch = placeName.match(placeRegex);

  const streetAddress = streetMatch ? streetMatch[1].trim() : '';
  const postalCode = postalCodeMatch ? postalCodeMatch[0] : '';
  const city = cityMatch ? cityMatch[0] : '';
  const country = countryMatch ? countryMatch[0] : '';
  const place = placeMatch? placeMatch[0]: '';

  return { streetAddress, postalCode, city, country, place };
};

const geocodeAddress = async (geocoding_adress) => {
  try {
    const response = await axios.get(`${BASE_URL}${encodeURIComponent(geocoding_adress)}.json`, {
      params: {
        proximity: '-73.990593,40.740121',
        access_token: ACCESS_TOKEN,
      },
    });
    console.log(response)

    const features = response.data.features;
    if (features.length > 0) {
      const { center, place_name } = features[0];
      const { streetAddress, postalCode, city, country, place } = parsePlaceName(place_name);
      const [longitude, latitude] = center;

      return { latitude, longitude, streetAddress, postalCode, city, country, place };
    }

    throw new Error('Adresse non trouvée');
  } catch (error) {
    throw new Error('Erreur lors de la récupération des données de géocodage');
  }
};

export { geocodeAddress };
