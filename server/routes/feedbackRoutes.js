import express from 'express';
import { submitFeedback , getAllFeedback} from '../controller/feedbackController.js';

const router = express.Router();

// POST route to submit feedback
router.post('/feedback', submitFeedback);
router.get('/feedback', getAllFeedback);

export default router;
