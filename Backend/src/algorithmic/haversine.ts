// Explication i use haversine formula to calculate distance. I need retrieve event near to user:
// Φ : It's latitude
// λ : It's longitude

export function CalculateDistance(
  phiUser: number,
  deltaUser: number,
  phiX: number,
  deltaY: number,
) {
  // Step 1 : Calculate for radius to each coordinate
  let radLatitudeUser = phiUser * (Math.PI / 180);
  let radLatitudeX = phiX * (Math.PI / 180);

  let radLongitudeUser = deltaUser * (Math.PI / 180);
  let radLongitudeY = deltaY * (Math.PI / 180);

  // Step 2 : Retrieve difference with the 2 coordinate to compare
  let diffRadLatitude = radLatitudeX - radLatitudeUser;
  let diffRadLongitude = radLongitudeY - radLongitudeUser;

  // Step 3 : Calculate a, c, d
  let a =
    Math.pow(Math.sin(diffRadLatitude / 2), 2) +
    Math.cos(radLatitudeUser) *
      Math.cos(radLatitudeX) *
      Math.pow(Math.sin(diffRadLongitude / 2), 2);

  let r = 6371; // Radius of earth in kilometers

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  let d = r * c;
  const finalDistance = Math.trunc(d);
  return finalDistance;
}

export default {
  CalculateDistance,
};
