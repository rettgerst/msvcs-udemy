import { useState, useEffect } from 'react';

export default function CommentList({ postId }: { postId: string }) {
	const [comments, setComments] = useState<
		Array<{ id: string; content: string }>
	>([]);

	useEffect(() => {
		fetch(`http://localhost:4001/posts/${postId}/comments`)
			.then(r => r.json())
			.then(setComments);
	}, [postId]);

	const renderedComments = comments.map(comment => {
		return <li key={comment.id}>{comment.content}</li>;
	});

	return <ul>{renderedComments}</ul>;
}
