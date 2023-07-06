import { Paper, Title } from '@mantine/core';
import { Spotify as SpotifyPlayer } from 'react-spotify-embed';
export default function Spotify({ contentUrl }) {
	/* console.log('Spotify url', contentUrl); */
	return (
		<Paper maw={600} shadow="md" p="md">
			<Title mb={20} order={1} color='grey' size={15} align='left'>
				🎵 Spotify Player
			</Title>
			<div id="spotify-player">
				{!contentUrl && <p>Configure spotify content url in settings</p>}
				{contentUrl && <SpotifyPlayer link={contentUrl} />}
			</div>
		</Paper>
	);
}
