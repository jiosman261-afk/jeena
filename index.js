/**
 * Vercel Serverless Function for Tamasha Stream Redirection / Proxy
 * This script bypasses CORS or token constraints by redirecting or proxing the live TV stream.
 */

const axios = require('axios');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Default target or query parameter stream
    // Using a sample dynamic structural placeholder or an active live stream format pattern for Tamasha
    const streamUrl = req.query.url || "https://tamashaweb.com/stream/live/channel1/index.m3u8";

    try {
        // Option 1: Direct HTTP Redirect (302) if token is embedded
        // Option 2: Proxy the manifest to inject custom headers if needed
        // For standard simple redirection, we use HTTP 302:
        res.writeHead(302, {
            'Location': streamUrl
        });
        res.end();
    } catch (error) {
        res.status(500).json({ error: "Failed to redirect stream", details: error.message });
    }
};
