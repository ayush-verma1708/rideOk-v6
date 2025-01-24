// Constants for validation
const MAX_DEVIATION_KM = 2; // Maximum allowed deviation from route in kilometers
const MIN_OVERLAP_PERCENTAGE = 0.4; // Minimum route overlap required (40%)

/**
 * Calculate distance between two points using Haversine formula
 * @param {Object} point1 - {lat, lng} coordinates
 * @param {Object} point2 - {lat, lng/lon} coordinates
 * @returns {number} Distance in kilometers
 */
const calculateDistance = (point1, point2) => {
    const R = 6371; // Earth's radius in km
    const lat1 = toRadians(point1.lat);
    const lat2 = toRadians(point2.lat);
    const lng1 = toRadians(point1.lng || point1.lon);
    const lng2 = toRadians(point2.lng || point2.lon);

    const dLat = lat2 - lat1;
    const dLng = lng2 - lng1;

    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

const toRadians = (degrees) => {
    return degrees * (Math.PI/180);
};

/**
 * Calculate if a point is near a line segment (route)
 * @param {Object} point - Point to check
 * @param {Object} routeStart - Start point of route
 * @param {Object} routeEnd - End point of route
 * @returns {boolean} Whether point is near the route
 */
const isPointNearRoute = (point, routeStart, routeEnd) => {
    // Calculate distances
    const d1 = calculateDistance(point, routeStart);
    const d2 = calculateDistance(point, routeEnd);
    const routeLength = calculateDistance(routeStart, routeEnd);

    // Check if point is within reasonable deviation from route
    const buffer = 0.1; // 100m buffer for floating point calculations
    return Math.abs(d1 + d2 - routeLength) <= MAX_DEVIATION_KM + buffer;
};

/**
 * Check if routes are going in the same general direction
 * @param {Object} passengerStart - Passenger pickup point
 * @param {Object} passengerEnd - Passenger drop point
 * @param {Object} driverStart - Driver route start
 * @param {Object} driverEnd - Driver route end
 * @returns {boolean} Whether routes are aligned
 */
const areRoutesAligned = (passengerStart, passengerEnd, driverStart, driverEnd) => {
    // Calculate bearing for both routes
    const passengerBearing = calculateBearing(passengerStart, passengerEnd);
    const driverBearing = calculateBearing(driverStart, driverEnd);
    
    // Allow for some deviation in direction (45 degrees)
    const maxDeviation = 45;
    const bearingDiff = Math.abs(passengerBearing - driverBearing);
    return bearingDiff <= maxDeviation || bearingDiff >= (360 - maxDeviation);
};

/**
 * Calculate bearing between two points
 * @param {Object} start - Start point
 * @param {Object} end - End point
 * @returns {number} Bearing in degrees
 */
const calculateBearing = (start, end) => {
    const startLat = toRadians(start.lat);
    const startLng = toRadians(start.lng || start.lon);
    const endLat = toRadians(end.lat);
    const endLng = toRadians(end.lng || end.lon);

    const y = Math.sin(endLng - startLng) * Math.cos(endLat);
    const x = Math.cos(startLat) * Math.sin(endLat) -
              Math.sin(startLat) * Math.cos(endLat) * Math.cos(endLng - startLng);
    
    let bearing = Math.atan2(y, x);
    bearing = toDegrees(bearing);
    return (bearing + 360) % 360;
};

const toDegrees = (radians) => {
    return radians * (180/Math.PI);
};

/**
 * Calculate route overlap percentage
 * @param {Object} passengerStart - Passenger pickup point
 * @param {Object} passengerEnd - Passenger drop point
 * @param {Object} driverStart - Driver route start
 * @param {Object} driverEnd - Driver route end
 * @returns {number} Overlap percentage (0-1)
 */
const calculateRouteOverlap = (passengerStart, passengerEnd, driverStart, driverEnd) => {
    const passengerDistance = calculateDistance(passengerStart, passengerEnd);
    const driverDistance = calculateDistance(driverStart, driverEnd);
    
    // Calculate shared distance (approximate)
    const sharedDistance = Math.min(
        calculateDistance(passengerStart, driverEnd),
        calculateDistance(driverStart, passengerEnd)
    );
    
    return sharedDistance / Math.max(passengerDistance, driverDistance);
};

/**
 * Validate if passenger route is compatible with driver route
 * @param {Object} pickup - Passenger pickup coordinates
 * @param {Object} drop - Passenger drop coordinates
 * @param {Object} routeStart - Driver route start coordinates
 * @param {Object} routeEnd - Driver route end coordinates
 * @returns {boolean} Whether routes are compatible for carpooling
 */
export const isPassengerRouteValid = (pickup, drop, routeStart, routeEnd) => {
    // Check if pickup and drop points are near the route
    const isPickupValid = isPointNearRoute(pickup, routeStart, routeEnd);
    const isDropValid = isPointNearRoute(drop, routeStart, routeEnd);

    // Check if routes are going in the same direction
    const isDirectionValid = areRoutesAligned(pickup, drop, routeStart, routeEnd);

    // Check if there's sufficient route overlap
    const overlapPercentage = calculateRouteOverlap(pickup, drop, routeStart, routeEnd);
    const hasEnoughOverlap = overlapPercentage >= MIN_OVERLAP_PERCENTAGE;

    // All conditions must be satisfied
    return isPickupValid && isDropValid && isDirectionValid && hasEnoughOverlap;
};