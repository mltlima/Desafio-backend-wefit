import { Router } from 'express';
import { createProfileController } from '../controllers/profileController';
import { validateProfileData } from '../middlewares/validationMiddleware';

const router = Router();

router.post('/create_profile', validateProfileData, createProfileController);

export default router;
