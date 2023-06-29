import { Container } from '@mantine/core';

import Pomodoro from '../components/Pomodoro';

export default function Home(props) {
	return (
		<Container fluid>
			<h1>restricted home page 👍</h1>
			<Pomodoro
				minutesLeft={props.minutesLeft}
				setMinutesLeft={props.setMinutesLeft}
				secondsLeft={props.secondsLeft}
				setSecondsLeft={props.setSecondsLeft}
				timerStatus={props.timerStatus}
				setTimerStatus={props.setTimerStatus}
				timerRef={props.timerRef}
			/>
		</Container>
	);
}
