// api/validRoute.ts
import axios from 'axios';

// Define types for the pickup, drop, and ownerRoute parameters
interface Location {
    lat: number;
    lon: number;
    address: string;
}

interface OwnerRoute {
    startLocation: Location;
    endLocation: Location;
    distance: number;
}

// Define the response structure from the validation API
interface ValidationResponse {
    isValid: boolean;
    message?: string;
}

export const validateRoute = async (
    pickup: Location,
    drop: Location,
    ownerRoute: OwnerRoute
): Promise<ValidationResponse> => {
    try {
        const response = await axios.post('https://rideok-v5.onrender.com/api/validate-route', {
            pickup,
            drop,
            ownerRoute,
        });
        return response.data; // returns the validation response from the backend
    } catch (error) {
        throw new Error('An error occurred while validating the route.');
    }
};
