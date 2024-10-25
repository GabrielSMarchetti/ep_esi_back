import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/UserRepository';
import { IHandler } from '../interfaces/IHandler';
import dotenv from 'dotenv';

dotenv.config();
const jwtSecret = process.env.JWT_SECRET_KEY as string;

class LoginHandler implements IHandler {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public async handleRequest(req: Request, res: Response): Promise<void> {
        const { username, password } = req.body;

        try {
            const user = await this.userRepository.findOneByUsername(username);
            if (!user) {
                res.status(401).json({ message: 'Invalid username or password' });
                return;
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: 'Invalid username or password' });
                return;
            }

            const token = jwt.sign({ id: user.username, username: user.username, roles: user.roles }, jwtSecret , {
                expiresIn: '1h',
            });

            res.status(200).json({ token });
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

export { LoginHandler };