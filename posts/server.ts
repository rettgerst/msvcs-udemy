import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const bus = 'http://localhost:4005/events';

interface Event {
	type: string;
	data: any;
}

function emitEvent(event: Event) {
	return fetch(bus, {
		method: 'post',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(event)
	});
}

interface Post {
	id: string;
	title: string;
}

const posts: Record<string, Post> = {};

app.get('/posts', (req, res) => {
	res.json(posts);
});

app.post('/posts', (req, res) => {
	const id = uuid();
	const { title } = req.body;
	posts[id] = { id, title };
	emitEvent({ type: 'PostCreated', data: { id, title } });
	res.json(posts);
});

app.post('/events', (req, res) => {
	console.log('Received Event', req.body.type);

	res.send({});
});

app.listen(4000, () => {
	console.log('listening on 4000');
});
