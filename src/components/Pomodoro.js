import React, { useEffect } from 'react';
import { Paper, NumberInput, Center, Button, Flex } from '@mantine/core';
import PomodoroTimer from './Pomodoro/PomodoroTimer';
import PomodoroControls from './Pomodoro/PomodoroControls';

export default function Pomodoro(props) {
	useEffect(() => {
		if (props.timerStatus === 'running') {
			props.timerRef.current = setInterval(() => {
				if (props.remainingSeconds > 0) {
					props.setRemainingSeconds(
						(prevRemainingSeconds) => prevRemainingSeconds - 1
					);
				} else {
					clearInterval(props.timerRef.current);
					props.setTimerStatus('stopped');
					alert('Time is up!');
				}
			}, 1000);
		}
		return () => {
			clearInterval(props.timerRef.current);
		};
	}, [props.timerStatus, props.remainingSeconds]);

	const handleStartTimer = () => {
		if (props.remainingSeconds > 0) {
			props.setTimerStatus('running');
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

	const timeFormat = (s) => {
		let minutes = Math.floor(s / 60);
		let seconds = (s % 60).toString().padStart(2, '0');

		return `${minutes}:${seconds}`;
	};
	return (
		<Center>
			<Paper maw={600} shadow="xs" p="md">
				<PomodoroTimer
					timeFormat={timeFormat}
					remainingSeconds={props.remainingSeconds}
				></PomodoroTimer>
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
