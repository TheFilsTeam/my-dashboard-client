import { Button, NavLink, Paper, Text, Title } from '@mantine/core';
import { useState } from 'react';
import backendApi from '../services/backendApi.service';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export default function CowSay({ friends }) {
	const [thought, setThought] = useState(null);

	function getNewThought(url) {
		backendApi
			.get(url)
			.then((response) => {
				const cowSayContent = response.data.text;
				setThought(cowSayContent);
				console.log(cowSayContent);
				return cowSayContent;
			})
			.catch((e) => setThought(e.Message));
	}

	return (
		<Paper maw={600} shadow="md" p="md">
			<Title order={1} color="grey" size={15} align="left">
				🐮💬
			</Title>
			<Button onClick={() => getNewThought('/api/utils/cowsay')} m={10}>
				Ask for help!
			</Button>
			<Button onClick={() => getNewThought('/api/utils/cowgroup')}>
				Wedding time!
			</Button>
			{thought && <pre style={{ textAlign: 'left' }}>{thought}</pre>}
			{!thought && !friends && (
				<Text fz={'sm'}>
					No friends configured. Please configure it in the{' '}
					{/* <Link to="./settings"> */}settings{/* </Link> */}
				</Text>
			)}
			{!thought && (
				<pre style={{ textAlign: 'left' }}>
					Wait! The cow will say something...{' '}
				</pre>
			)}
		</Paper>
	);
}
