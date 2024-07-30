const axios = require('axios');

async function searchYouTube(keywords) {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(keywords)}`;
    const res = await axios.get(url);
    const getJson = JSON.parse(res.data.split("ytInitialData = ")[1].split(";</script>")[0]);
    const videos = getJson.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents;
    if (!videos.length) {
        throw new Error('No videos found for the provided keywords.');
    }
    const videoId = videos[0].videoRenderer.videoId;
    return `https://www.youtube.com/watch?v=${videoId}`;
}

// Add similar functions for Facebook, TikTok, X, etc.

module.exports = {
    searchYouTube,
    // searchFacebook,
    // searchTikTok,
    // searchX,
};
