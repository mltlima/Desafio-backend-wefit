import { Request, Response } from 'express';
import { IProfileData } from '../interfaces/IProfileData';
import { createProfile } from '../services/profileService';

export const createProfileController = (req: Request, res: Response) => {
    const profileData: IProfileData = req.body;
    createProfile(profileData);
    res.status(201).send({ message: "User profile created successfully" });
};
