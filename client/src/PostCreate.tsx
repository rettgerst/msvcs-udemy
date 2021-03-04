import React, { FormEvent, useState } from 'react';

export default function PostCreate() {
	const [title, setTitle] = useState('');

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		await fetch('http://localhost:4000/posts', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title
			})
		});

		setTitle('');
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Title</label>
					<input
						value={title}
						onChange={e => setTitle(e.target.value)}
						className="form-control"
					/>
				</div>
				<button className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
}
