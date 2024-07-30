const ytdl = require('ytdl-core');

async function downloadFromYouTube(url, type) {
    try {
        const info = await ytdl.getInfo(url);
        let format;

        if (type === 'audio') {
            format = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });
            format = { ...format, itag: '140' }; // MP3 format
        } else {
            format = ytdl.chooseFormat(info.formats, { quality: 'lowestvideo' });
            format = { ...format, itag: '18' }; // MP4 format 360p
        }

        const stream = ytdl.downloadFromInfo(info, { format });
        const ext = type === 'audio' ? 'mp3' : 'mp4';
        return { stream, ext };
    } catch (error) {
        console.error('Error in downloadFromYouTube:', error);
        throw error;
    }
}
