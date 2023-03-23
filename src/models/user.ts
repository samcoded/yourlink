// user model with name, email and password with mongoose schema and interface

import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword: (candidatePassword: string) => boolean;
}

const UserSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
