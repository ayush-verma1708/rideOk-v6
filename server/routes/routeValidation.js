import express from 'express';
import { isPassengerRouteValid } from '../service/routeValidationService.js';

const router = express.Router();

// POST route to validate pickup and drop locations
router.post('/validate-route', (req, res) => {
    const { pickup, drop, ownerRoute } = req.body;

    const isRouteValid = isPassengerRouteValid(
        pickup,
        drop,
        ownerRoute.startLocation,
        ownerRoute.endLocation,
        ownerRoute.distance
    );

    // Always return a 200 response with the validation result
    return res.json({
        isValid: isRouteValid,
        message: isRouteValid
            ? 'Pickup and drop locations are valid and aligned with the owner\'s route.'
            : 'Invalid pickup or drop locations. Ensure they are near the owner\'s route and moving in the same direction.',
    });
});


export default router;
