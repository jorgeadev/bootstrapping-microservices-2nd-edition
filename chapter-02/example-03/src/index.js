import express from 'express';
import fs from "fs";

const app = express();

// Throws an error if the PORT environment variable is missing.
if (!process.env.PORT) {
	throw new Error("Please specify the port number for the HTTP server with the environment variable PORT.");
}
const PORT = process.env.PORT || 3000;

app.get("/video", async (req, res) => {
	const videoPath = "../videos/SampleVideo_1280x720_1mb.mp4";
	const stats = await fs.promises.stat(videoPath);
	
	res.writeHead(200, {
		'Content-Type': 'video/mp4',
		'Content-Length': stats.size,
		'Accept-Ranges': 'bytes'
	});
	
	fs.createReadStream(videoPath).pipe(res);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${ PORT }, point your browser at http://localhost:${ PORT }/video to watch the video`);
});