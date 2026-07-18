import { Router } from 'express';
import { CopilotController } from '../controllers/copilot.controller';

const router = Router();

// Endpoint for Stadium Organizer AI Copilot operations reasoning
router.post('/reason', CopilotController.reason);

export default router;
