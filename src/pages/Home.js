import { Container } from '@mantine/core';

import Pomodoro from '../components/Pomodoro';

export default function Home() {
	return (
		<Container fluid>
			<h1>restricted home page 👍</h1>
			<Pomodoro />
		</Container>
	);
}
