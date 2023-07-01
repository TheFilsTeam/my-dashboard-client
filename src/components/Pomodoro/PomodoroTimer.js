import React, { useEffect } from 'react';
import { Button, Flex, NumberInput, Text } from '@mantine/core';

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
					if (Notification.permission === "granted") {
						var options = {
							body: 'Please make a break!',
							icon: './hourglass.png',
						  };
						new Notification('Time is up!', options);
					} else {
						alert("Please make a break!");
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
			direction="column"
			wrap="wrap"
		>
			<Flex
				mih={50}
				gap="md"
				m="sm"
				justify="center"
				align="center"
				direction="row"
				wrap="wrap"
			>
				<Button miw={80} onClick={() => addToTimer(5)}>
					+5m
				</Button>
				<Button miw={80} onClick={() => addToTimer(10)}>
					+10m
				</Button>
				<Button miw={80} onClick={() => addToTimer(15)}>
					+15m
				</Button>
			</Flex>
			<Flex
				mih={50}
				gap="md"
				m="sm"
				justify="center"
				align="center"
				direction="row"
				wrap="wrap"
			>
				<NumberInput
					maw={70}
					label="Minutes"
					defaultValue={0}
					value={props.minutesLeft}
					onChange={(e) => props.setRemainingSeconds(e * 60)}
					min={0}
					max={60}
					parser={(value) => value.replace(/[^\d]/g, '')}
					formatter={(value) => value}
				/>
				<NumberInput
					maw={70}
					label="Seconds"
					defaultValue={0}
					value={props.secondsLeft}
					onChange={(e) => props.setRemainingSeconds(e)}
					min={0}
					max={60}
					parser={(value) => value.replace(/[^\d]/g, '')}
					formatter={(value) => value}
				/>
				<Text>{timeFormat(props.remainingSeconds)}</Text>
			</Flex>

			<Flex
				mih={50}
				justify="center"
				align="center"
				direction="row"
				wrap="wrap"
				gap="md"
			>
				<Button variant="filled" onClick={handleStartTimer}>
					Start timer
				</Button>
				<Button color="red" variant="filled" onClick={handleStopTimer}>
					Stop timer
				</Button>
				<Button color="red" variant="outline" onClick={handleResetTimer}>
					Reset timer
				</Button>
			</Flex>
		</Flex>
	);
}
