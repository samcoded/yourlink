import { Request, Response } from 'express';
import { getIpLocation } from '../utils';
import Url from '../models/url';
import Visit from '../models/visit';
const IP = require('ip');

export const redirectUrl = async (req: Request, res: Response) => {
    try {
        const url = await Url.findOne({ urlSlug: req.params.urlSlug });
        if (url) {
            const ipAddress: string = IP.address() || req.socket.remoteAddress!;
            const userAgent: string = req.headers['user-agent']!;
            const referer: string = req.headers.referer || 'Unknown';
            const ipLocation = await getIpLocation(ipAddress);

            const newVisit = new Visit({
                url: url._id,
                ipAddress,
                userAgent,
                referer,
                country: ipLocation.country || 'Unknown',
                countryCode: ipLocation.country_code || 'Unknown',
                city: ipLocation.city || 'Unknown',
                continent: ipLocation.continent || 'Unknown',
                latitude: ipLocation.latitude || 'Unknown',
                longitude: ipLocation.longitude || 'Unknown',
            });

            await newVisit.save();
            res.redirect(url.originalUrl);
        } else {
            res.status(404).json({ error: 'Url not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const createUrl = async (req: Request, res: Response) => {
    const { originalUrl, urlSlug } = req.body;
    try {
        let payload = {};

        // if user is authenticated, save the url to the user
        if (req.params.logged_user_id) {
            payload = {
                originalUrl,
                urlSlug,
                user: req.params.logged_user_id,
            };
        } else {
            payload = {
                originalUrl,
                urlSlug,
            };
        }
        const newUrl = new Url(payload);

        await newUrl.save();
        res.json(newUrl);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};
