import React from 'react';
import { Flex, Text } from '@mantine/core';

export default function PomodoroTimer(props) {
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
					if (Notification.permission === 'granted') {
						var options = {
							body: 'Please make a break!',
							icon: './hourglass.png',
						};
						new Notification('Time is up!', options);
					} else {
						alert('Please make a break!');
					}
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
		<Flex
			mih={50}
			gap="md"
			justify="center"
			align="center"
			direction="row"
			wrap="wrap"
		>
			<Text>Pomodoro Timer:</Text>
			<Text>{props.timeFormat(props.remainingSeconds)}</Text>
		</Flex>
	);
}
