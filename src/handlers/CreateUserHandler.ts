import { Request, Response } from 'express';
import { UserRepository } from '../repositories/UserRepository';
import { IHandler } from '../interfaces/IHandler';
import bcrypt from 'bcrypt';
import { validateUserType } from '../enums/UserTypes';

export class CreateUserHandler implements IHandler {
    private userRepository: UserRepository

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const userData = req.body;    
        if (!userData.username || !userData.password || !userData.user_type) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }
        if (!validateUserType(userData.user_type)) {
            res.status(400).json({ error: 'Invalid usertype' });
            return;
        }
        const user = await this.userRepository.save(userData);
        res.status(200).json(user);
    }
}