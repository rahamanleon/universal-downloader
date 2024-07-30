const { downloadFromYouTube, downloadFromFacebook, downloadFromTikTok, downloadFromX } = require('../services/downloaderService');
const { searchYouTube } = require('../services/searchService');
const { saveStreamToFile } = require('../utils/fileUtils');
const path = require('path');

async function downloadHandler(req, res) {
    const { url, type, platform } = req.query;

    if (!url) {
        return res.status(400).send('Missing video URL');
    }

    if (!type || (type !== 'audio' && type !== 'video')) {
        return res.status(400).send('Invalid or missing type. Use "audio" or "video".');
    }

    if (!platform || !['youtube', 'facebook', 'tiktok', 'x'].includes(platform.toLowerCase())) {
        return res.status(400).send('Invalid or missing platform. Use "youtube", "facebook", "tiktok", or "x".');
    }

    try {
        let downloadFunc;
        switch (platform.toLowerCase()) {
            case 'youtube':
                downloadFunc = downloadFromYouTube;
                break;
            case 'facebook':
                downloadFunc = downloadFromFacebook;
                break;
            case 'tiktok':
                downloadFunc = downloadFromTikTok;
                break;
            case 'x':
                downloadFunc = downloadFromX;
                break;
        }

        const { stream, ext } = await downloadFunc(url, type);
        res.setHeader('Content-Disposition', `attachment; filename="download.${ext}"`);
        stream.pipe(res);
    } catch (error) {
        res.status(500).send('Failed to download video');
    }
}

async function searchHandler(req, res) {
    const { keywords, platform } = req.query;

    if (!keywords) {
        return res.status(400).send('Missing search keywords');
    }

    if (!platform || !['youtube', 'facebook', 'tiktok', 'x'].includes(platform.toLowerCase())) {
        return res.status(400).send('Invalid or missing platform. Use "youtube", "facebook", "tiktok", or "x".');
    }

    try {
        let searchFunc;
        switch (platform.toLowerCase()) {
            case 'youtube':
                searchFunc = searchYouTube;
                break;
            // case 'facebook':
            //     searchFunc = searchFacebook;
            //     break;
            // case 'tiktok':
            //     searchFunc = searchTikTok;
            //     break;
            // case 'x':
            //     searchFunc = searchX;
            //     break;
        }

        const videoUrl = await searchFunc(keywords);
        res.send({ videoUrl });
    } catch (error) {
        res.status(500).send('Failed to search for video');
    }
}

module.exports = {
    downloadHandler,
    searchHandler,
};
