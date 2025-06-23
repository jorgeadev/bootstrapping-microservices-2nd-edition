import express from "express";
import fs from "fs";

const app = express();

const PORT = process.env.PORT || 3000;

console.log(process.env.PORT);

app.get('/', (req, res) => {
	res.send('Hello, World!');
});

app.get("/video", async (req, res) => {
	const videoPath = "./videos/SampleVideo_1280x720_1mb.mp4";
	const stats = await fs.promises.stat(videoPath);
	
	res.writeHead(200, {
		'Content-Type': 'video/mp4',
		'Content-Length': stats.size,
		'Accept-Ranges': 'bytes'
	});
	
	fs.createReadStream(videoPath).pipe(res);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${ PORT }`);
});