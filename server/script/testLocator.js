const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };
  
  // Function to calculate the bearing between two coordinates
  const calculateBearing = (lat1, lon1, lat2, lon2) => {
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const lat1Rad = lat1 * (Math.PI / 180);
    const lat2Rad = lat2 * (Math.PI / 180);
  
    const y = Math.sin(dLon) * Math.cos(lat2Rad);
    const x =
      Math.cos(lat1Rad) * Math.sin(lat2Rad) -
      Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  
    const bearing = Math.atan2(y, x) * (180 / Math.PI); // in degrees
    return (bearing + 360) % 360; // normalize to 0-360
  };
  
  // Function to check if the passenger is moving in the same direction as the car owner
  const isLocationMovingInSameDirection = (location, start, end) => {
    const passengerBearing = calculateBearing(start.lat, start.lon, location.lat, location.lon);
    const ownerBearing = calculateBearing(start.lat, start.lon, end.lat, end.lon);
  
    // Allow for a slight variance in the direction (say, within 30 degrees)
    const bearingDifference = Math.abs(ownerBearing - passengerBearing);
    return bearingDifference <= 30 || bearingDifference >= 330; // Allow +-30 degrees
  };
  
  // Function to check if a location is near a segment and moving in the same direction
  const isLocationNearSegment = (location, start, end, tolerance = 5) => {
    const segmentDistance = haversineDistance(start.lat, start.lon, end.lat, end.lon);
    const distToStart = haversineDistance(location.lat, location.lon, start.lat, start.lon);
    const distToEnd = haversineDistance(location.lat, location.lon, end.lat, end.lon);
  
    return distToStart + distToEnd <= segmentDistance + tolerance && isLocationMovingInSameDirection(location, start, end);
  };
  
  // Function to check if the location is valid within the whole route (considering segments)
  const isLocationNearRoute = (location, route, tolerance = 5) => {
    for (let i = 0; i < route.length - 1; i++) {
      const segmentStart = route[i];
      const segmentEnd = route[i + 1];
      if (isLocationNearSegment(location, segmentStart, segmentEnd, tolerance)) {
        return true;
      }
    }
    return false;
  };
  
  // Simulating the car owner's path (Start and End Locations)
  const ownerStartCoords = { lat: 28.652514770535902, lon: 77.36608985516447 }; // Hindon Elevated Road, Vasundhara, Ghaziabad
  const ownerEndCoords = { lat: 28.4646148, lon: 77.0299194 }; // Gurugram, Haryana
  
  // Define the car owner's route (can be extended with multiple points)
  const ownerRoute = [
    { lat: ownerStartCoords.lat, lon: ownerStartCoords.lon },
    { lat: ownerEndCoords.lat, lon: ownerEndCoords.lon },
  ];
  
  // Simulated passenger locations for testing (you can change this)
  const resolvedPickup = { address: "Rheuma Clinic, Doctor Sushila Naiyar Marg, Indirapuram, Ghaziabad, Uttar Pradesh, 201014, India", lat: 28.572413, lon: 77.326118};
  const resolvedDrop = { address: "Amity University, Noida, Noida-Greater Noida Expre…Gautam Buddha Nagar, Uttar Pradesh, 201301, India",  lat: 28.527204, lon: 77.220856};
  
  // Test logic
  const testLocationValidation = () => {
    // Check if the passenger's pickup and drop locations are near the car owner's route
    const isPickupValid = isLocationNearRoute(resolvedPickup, ownerRoute);
    const isDropValid = isLocationNearRoute(resolvedDrop, ownerRoute);
  
    // Return validation results
    if (!isPickupValid || !isDropValid) {
      console.error('Error: Pickup and drop locations must be within 5 km of the trip organizer’s route and moving in the same direction.');
      return;
    }
  
    console.log('Success: Valid locations');
  };
  
  // Run the test
  testLocationValidation();
  