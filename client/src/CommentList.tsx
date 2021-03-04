export default function CommentList({
	postId,
	comments
}: {
	postId: string;
	comments: Array<{ id: string; content: string }>;
}) {
	const renderedComments = comments.map(comment => {
		return <li key={comment.id}>{comment.content}</li>;
	});

	return <ul>{renderedComments}</ul>;
}
