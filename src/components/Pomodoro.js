import React, { useEffect } from 'react';
import { Paper, NumberInput, Center, Button, Flex } from '@mantine/core';
import PomodoroTimer from './Pomodoro/PomodoroTimer';
import PomodoroControls from './Pomodoro/PomodoroControls';

export default function Pomodoro(props) {
	const handleStartTimer = () => {
		if (props.remainingSeconds > 0) {
			props.setTimerStatus('launching');
		} else {
			alert('Please enter a valid number of minutes.');
		}
	};

	const handleStopTimer = () => {
		props.setTimerStatus('stopped');
	};

	const handleResetTimer = () => {
		props.setTimerStatus('stopped');
		props.setRemainingSeconds(0);
	};

	const addToTimer = (min) => {
		if (props.timerStatus === 'stopped') {
			props.setRemainingSeconds((prevDuration) => prevDuration + min * 60);
		}
	};

	return (
		<Center>
			<Paper maw={600} shadow="xs" p="md">
				{/* <PomodoroTimer
					timeFormat={props.timeFormat}
					remainingSeconds={props.remainingSeconds}
				></PomodoroTimer> */}
				<PomodoroControls
					addToTimer={addToTimer}
					handleStartTimer={handleStartTimer}
					handleStopTimer={handleStopTimer}
					handleResetTimer={handleResetTimer}
					setRemainingSeconds={props.setRemainingSeconds}
				></PomodoroControls>
			</Paper>
		</Center>
	);
}
