import mongoose, { Schema, Document } from 'mongoose';

export interface IUrl extends Document {
    originalUrl: string;
    urlSlug: string;
}

const UrlSchema: Schema = new mongoose.Schema(
    {
        originalUrl: {
            type: String,
            required: true,
        },
        urlSlug: {
            type: String,
            required: true,
            unique: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    { timestamps: true }
);

export default mongoose.model<IUrl>('Url', UrlSchema);
