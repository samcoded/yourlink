// user login and registration controller

import { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { hashPassword, comparePassword } from '../utils';

dotenv.config();

export const register = async (req: Request, res: Response) => {
    try {
        const { email, password, name } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: 'Email is taken',
            });
        }

        const newUser = new User({ email, password, name });

        newUser.password = await hashPassword(newUser.password);
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!);

        const userData = {
            email: newUser.email,
            name: newUser.name,
            _id: newUser._id,
        };
        return res.json({
            token,
            user: userData,
            success: true,
            message: 'User created',
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: 'Email is taken',
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Email or password is incorrect',
            });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Email or password is incorrect',
            });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
        const userData = { email: user.email, name: user.name, _id: user._id };
        return res.json({ token, user: userData, success: true });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Email or password is incorrect',
        });
    }
};
