import express from 'express';
import cors from 'cors';
import { v4 as uuid } from 'uuid';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
	res.json(posts);
});

app.listen(4000, () => {
	console.log('listening on 4000');
});
