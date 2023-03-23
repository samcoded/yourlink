// user login and registration controller

import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { hashPassword, comparePassword } from '../utils';

dotenv.config();

export const register = async (req: Request, res: Response) => {
    try {
        const user = new User(req.body);

        user.password = await hashPassword(user.password);
        await user.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
        return res.json({ token, user });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            error: 'Email is taken',
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                error: 'Email or password is incorrect',
            });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                error: 'Email or password is incorrect',
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
        return res.json({ token, user });
    } catch (err) {
        return res.status(400).json({
            error: 'Email or password is incorrect',
        });
    }
};
