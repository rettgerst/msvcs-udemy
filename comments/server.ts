import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());

interface Comment {
	id: string;
	content: string;
}

const commentsByPostId: Record<string, Comment[]> = {};

app.get('/posts/:id/comments', (req, res) => {
	res.json(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
	const id = uuid();
	const { content } = req.body;

	const comments = commentsByPostId[req.params.id] || [];
	comments.push({ id, content });

	commentsByPostId[req.params.id] = comments;

	res.status(201).json(comments);
});

app.listen(4001, () => {
	console.log('listening on 4001');
});
