import { Button, Paper } from '@mantine/core';
import backendApi from '../services/backendApi.service';
import { useEffect, useState } from 'react';

export default function Meme() {
	const [meme, setMeme] = useState({});

	function getNewThought() {
		backendApi
			.get('/api/utils/meme')
			.then((response) => {
				setMeme(response.data);
			})
			.catch((e) =>
				setMeme({
					url: 'https://s3.memeshappen.com/memes/SAY-IT-WORKS-IN-MY-MACHINE-ONE-MORE-TIME-meme-55254.jpg',
					title: 'Fail to get random meme',
				})
			);
	}

	useEffect(() => {
		getNewThought();
	}, []);

	return (
		<Paper shadow="xs" p="md">
			<div>
				<img
					src={meme.url}
					alt={meme.title}
					title={meme.title}
					style={{ maxHeight: '500px' }}
				/>
				{meme?.source && (
					<p>
						Provided with ❤️ by{' '}
						<a href={meme.source} target="_blank" rel="noreferrer">
							{meme.sourceName}
						</a>
					</p>
				)}
			</div>
			<Button onClick={getNewThought}>Get a random meme</Button>
		</Paper>
	);
}
