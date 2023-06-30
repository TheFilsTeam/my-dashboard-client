import React, { useEffect } from 'react';
import { Paper, NumberInput, Center, Button, Flex } from '@mantine/core';
import PomodoroTimer from './Pomodoro/PomodoroTimer';

export default function Pomodoro(props) {
	return (
		<Center>
			<Paper maw={600} shadow="xs" p="md">
				<PomodoroTimer
					remainingSeconds={props.remainingSeconds}
					setRemainingSeconds={props.setRemainingSeconds}
					timerStatus={props.timerStatus}
					setTimerStatus={props.setTimerStatus}
					timerRef={props.timerRef}
				></PomodoroTimer>
			</Paper>
		</Center>
	);
}
