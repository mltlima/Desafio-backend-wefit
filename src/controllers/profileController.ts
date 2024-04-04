import { Request, Response, NextFunction } from 'express';
import { IProfileData } from '../interfaces/IProfileData';
import { createProfile } from '../services/profileService';

export const createProfileController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const profileData: IProfileData = req.body;
        await createProfile(profileData);
        res.status(201).send({ message: "User profile created successfully" });
    } catch (error) {
        next(error);
    }
};
