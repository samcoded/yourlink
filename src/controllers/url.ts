import { Request, Response } from 'express';
import { getIpLocation } from '../utils';
import Url from '../models/url';
import Visit from '../models/visit';
const IP = require('ip');

export const redirectUrl = async (req: Request, res: Response) => {
    try {
        const url = await Url.findOne({
            urlSlug: new RegExp(`^${req.params.urlSlug}$`, 'i'),
        });
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
            res.redirect('/error');
        }
    } catch (err) {
        // console.log(err);
        res.redirect('/error');
    }
};

export const createUrl = async (req: Request, res: Response) => {
    let { originalUrl, urlSlug } = req.body;
    try {
        let payload = {};

        //search for url in db
        const url = await Url.findOne({
            urlSlug: new RegExp(`^${urlSlug}$`, 'i'),
        });

        if (url) {
            return res.status(400).json({
                success: false,
                message: 'Url Slug already exists',
            });
        }

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

        res.status(200).json({
            success: true,
            message: 'Url created',
            originalUrl: newUrl.originalUrl,
            urlSlug: newUrl.urlSlug,
        });
    } catch (err) {
        // console.log(err);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};

export const getUrls = async (req: Request, res: Response) => {
    try {
        if (req.params.logged_user_id == req.params.id) {
            const urls = await Url.find({
                user: req.params.logged_user_id,
            }).sort({ createdAt: -1 });
            res.json(urls);
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }

        // const urls = await Url.find({ user: req.params.id });
        // res.json(urls);
    } catch (err) {
        // console.log(err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const checkSlug = async (req: Request, res: Response) => {
    try {
        // const url = await Url.findOne({ urlSlug: req.params.urlSlug });
        const url = await Url.findOne({
            urlSlug: new RegExp(`^${req.params.urlSlug}$`, 'i'),
        });
        if (url) {
            res.json({ success: false });
        } else {
            res.json({ success: true });
        }
    } catch (err) {
        // console.log(err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};
