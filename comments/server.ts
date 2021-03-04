import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();

app.use(cors());
app.use(bodyParser.json());

interface Comment {
	id: string;
	content: string;
}

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

const commentsByPostId: Record<string, Comment[]> = {};

app.get('/posts/:id/comments', (req, res) => {
	res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
	const id = uuid();
	const { content } = req.body;

	const postId = req.params.id;

	const comments = commentsByPostId[postId] || [];
	comments.push({ id, content });

	commentsByPostId[postId] = comments;

	emitEvent({
		type: 'CommentCreated',
		data: {
			id,
			content,
			postId
		}
	});

	res.status(201).json(comments);
});

app.post('/events', (req, res) => {
	console.log('Received Event', req.body.type);

	res.send({});
});

app.listen(4001, () => {
	console.log('listening on 4001');
});
