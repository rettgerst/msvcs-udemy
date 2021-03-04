import express from 'express';
import cors from 'cors';
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

interface Comment {
	id: string;
	content: string;
}

interface Post {
	id: string;
	title: string;
	comments: Comment[];
}

const posts: Record<string, Post> = {};

app.get('/posts', (req, res) => {
	res.json(posts);
});

app.post('/events', (req, res) => {
	console.log('Received Event', req.body.type);

	const { type, data } = req.body;

	if (type === 'PostCreated') {
		const { id, title } = data;
		posts[id] = { id, title, comments: [] };
	} else if (type === 'CommentCreated') {
		const { id, content, postId } = data;

		const post = posts[postId];
		post.comments.push({ id, content });
	}

	console.log(JSON.stringify(posts, undefined, '\t'));

	res.send({});
});

app.listen(4002, () => {
	console.log('listening on 4002');
});
