import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/user';

import dotenv from 'dotenv';

dotenv.config();

const jwtSecret: Secret = process.env.JWT_SECRET as string;

export const checkToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '') || '';

        // if (!token)
        //     return res.status(401).json({
        //         error: 'Invalid Authentication',
        //     });
        if (token) {
            const decoded = jwt.verify(token as string, jwtSecret);
            const { id } = decoded as JwtPayload;

            const findUser = await User.findOne({ _id: id });

            // if (!findUser)
            //     return res.status(401).json({
            //         error: 'Invalid Authentication',
            //     });
            if (findUser) {
                req.params.logged_user_id = findUser.id;
                req.params.logged_user_name = findUser.name;
                req.params.logged_email = findUser.email;
            }
        }
    } catch (err) {
        // return res.status(401).json({
        //     error: (err as Error).message,
        // });
    }
    next();
};
