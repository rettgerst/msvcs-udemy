import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const services = [
	'http://localhost:4000/events',
	'http://localhost:4001/events',
	'http://localhost:4002/events'
];

function postEvent(event: any) {
	services.forEach(s => {
		fetch(s, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(event)
		});
	});
}

app.post('/events', (req, res) => {
	const event = req.body;

	postEvent(event);
});

app.listen(4005, () => {
	console.log('listening on 4005');
});
