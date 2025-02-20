const { alldl } = require('rahad-all-downloader');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);

async function downloadYouTubeMedia(url, outputDir = './downloads', options = {}) {
  try {
    // Ensure the output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Fetch the video metadata and URL using rahad-all-downloader
    const result = await alldl(url);

    if (result && result.data && result.data.videoUrl) {
      const videoUrl = result.data.videoUrl;
      const title = result.data.title.replace(/[^a-zA-Z0-9]/g, '_'); // Sanitize title for filename

      // Download the video
      const videoResponse = await fetch(videoUrl);
      const videoArrayBuffer = await videoResponse.arrayBuffer();
      const videoBuffer = Buffer.from(videoArrayBuffer);
      const videoFilePath = path.join(outputDir, `${title}.mp4`);
      fs.writeFileSync(videoFilePath, videoBuffer);

      console.log(`Video downloaded successfully: ${videoFilePath}`);

      // If audio extraction is requested
      if (options.extractAudio) {
        const audioFilePath = path.join(outputDir, `${title}.mp3`);

        await new Promise((resolve, reject) => {
          ffmpeg(videoFilePath)
            .output(audioFilePath)
            .audioCodec('libmp3lame') // Use MP3 codec
            .on('start', (commandLine) => {
              console.log(`FFmpeg process started with command: ${commandLine}`);
            })
            .on('progress', (progress) => {
              console.log(`Processing: ${progress.timemark}`);
            })
            .on('end', () => {
              console.log(`Audio extracted successfully: ${audioFilePath}`);
              resolve();
            })
            .on('error', (err) => {
              console.error('Error extracting audio:', err.message);
              reject(err);
            })
            .run();
        });

        // Delete the video file if only audio is needed
        if (options.deleteVideo) {
          fs.unlinkSync(videoFilePath);
          console.log(`Temporary video file deleted: ${videoFilePath}`);
        }

        return { filePath: audioFilePath, details: result.data };
      }

      return { filePath: videoFilePath, details: result.data };
    } else {
      throw new Error('No video URL found in the response.');
    }
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

module.exports = { downloadYouTubeMedia };
