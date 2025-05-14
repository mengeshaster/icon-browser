import express from 'express';
import axios from 'axios';
import OAuth from 'oauth-1.0a';
import crypto from 'crypto-js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const oauth = new OAuth({
    consumer: {
        key: process.env.API_KEY,
        secret: process.env.API_SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto.HmacSHA1(base_string, key).toString(crypto.enc.Base64);
    }
});

router.get('/getIcons', async (req, res) => {
    try {
        const term = req.query.term || 'computer';
        const limit = req.query.limit || 10;
        const offset = req.query.offset || 0;

        const requestData = {
            url: `https://api.thenounproject.com/v2/icon?query=${term}&limit=${limit}&offset=${offset}`,
            method: 'GET'
        };

        const authorization = oauth.authorize(requestData);

        const response = await axios({
            url: requestData.url,
            method: requestData.method,
            headers: oauth.toHeader(authorization)
        });

        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching icons:', error.message);
        res.status(500).json({
            error: 'Failed to fetch icons',
            message: error.message
        });
    }
});

export default router;