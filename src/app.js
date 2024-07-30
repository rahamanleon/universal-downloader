const express = require('express');
const { downloadFromYouTube, downloadFromFacebook, downloadFromTikTok, downloadFromX } = require('./services/downloaderService');

const app = express();

app.get('/', (req, res) => {
    res.send('Universal Downloader API is running');
});

app.get('/download', async (req, res) => {
    const { url, type } = req.query;
    try {
        let downloadFunction;

        if (url.includes('youtube.com')) {
            downloadFunction = downloadFromYouTube;
        } else if (url.includes('facebook.com')) {
            downloadFunction = downloadFromFacebook;
        } else if (url.includes('tiktok.com')) {
            downloadFunction = downloadFromTikTok;
        } else if (url.includes('x.com')) {
            downloadFunction = downloadFromX;
        } else {
            return res.status(400).send('Unsupported URL.');
        }

        const { stream, ext } = await downloadFunction(url, type);
        res.setHeader('Content-Disposition', `attachment; filename="download.${ext}"`);
        stream.pipe(res);
    } catch (error) {
        console.error('Error in /download route:', error);
        res.status(500).send('Failed to download the content.');
    }
});

module.exports = app;
