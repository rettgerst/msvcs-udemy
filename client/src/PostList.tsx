import React, { useState, useEffect } from 'react';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

interface Posts {
	[id: string]: {
		id: string;
		title: string;
		comments: Array<{ id: string; content: string; postId: string }>;
	};
}

export default function PostList() {
	const [posts, setPosts] = useState<Posts>({});

	useEffect(() => {
		fetch('http://localhost:4002/posts')
			.then(r => r.json())
			.then(setPosts);
	}, []);

	const renderedPosts = Object.values(posts).map(post => {
		return (
			<div
				className="card"
				style={{ width: '30%', marginBottom: '20px' }}
				key={post.id}
			>
				<div className="card-body">
					<h3>{post.title}</h3>
					<CommentList comments={posts[post.id].comments} postId={post.id} />
					<CommentCreate postId={post.id} />
				</div>
			</div>
		);
	});

	return (
		<div className="d-flex flex-row flex-wrap justify-content-between">
			{renderedPosts}
		</div>
	);
}
