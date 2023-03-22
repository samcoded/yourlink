import mongoose, { Schema, Document } from 'mongoose';

export interface IVisit extends Document {
    url: string;
    ipAddress: string;
    userAgent: string;
    referer: string;
    country: string;
    countryCode: string;
    city: string;
    continent: string;
    latitude: string;
    longitude: string;
}

const VisitSchema: Schema = new mongoose.Schema(
    {
        url: {
            required: true,
            type: Schema.Types.ObjectId,
            ref: 'Url',
        },
        ipAddress: {
            type: String,
            required: true,
        },
        userAgent: {
            type: String,
            required: true,
        },
        referer: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        countryCode: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        continent: {
            type: String,
            required: true,
        },
        latitude: {
            type: String,
            required: true,
        },
        longitude: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model<IVisit>('Visit', VisitSchema);
