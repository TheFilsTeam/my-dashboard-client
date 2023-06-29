import React, { useEffect, useState, useRef } from 'react';
import { Text, Paper, NumberInput, Center, Button, Flex } from '@mantine/core';

export default function Pomodoro() {
	const [minutesLeft, setMinutesLeft] = useState(0);
	const [secondsLeft, setSecondsLeft] = useState(0);
	const [timerStatus, setTimerStatus] = useState('stopped');
	const timerRef = useRef(null);

	useEffect(() => {
		if (timerStatus === 'running') {
			const startTime = Date.now();
			timerRef.current = setInterval(() => {
				const elapsedTime = Math.round((Date.now() - startTime) / 1000);
				const remainingTime = minutesLeft * 60 - elapsedTime;
				if (remainingTime >= 0) {
					setSecondsLeft(remainingTime % 60);
					setMinutesLeft(Math.floor(remainingTime / 60));
				} else {
					clearInterval(timerRef.current);
					setTimerStatus('stopped');
					alert('Time is up!');
				}
			}, 1000);
		}
		return () => {
			clearInterval(timerRef.current);
		};
	}, [timerStatus]);

	const handleStartTimer = () => {
		if (minutesLeft > 0) {
			setTimerStatus('running');
		} else {
			alert('Please enter a valid number of minutes.');
		}
	};

	const handleStopTimer = () => {
		setTimerStatus('stopped');
	};

	const handleResetTimer = () => {
		setTimerStatus('stopped');
		setSecondsLeft(0);
		setMinutesLeft(0);
	};

	return (
		<Center>
			<Paper maw={600} shadow="xs" p="md">
				<Flex
					mih={50}
					gap="md"
					justify="center"
					align="center"
					direction="row"
					wrap="wrap"
				>
					<Flex
						mih={50}
						gap="md"
						m="sm"
						justify="center"
						align="center"
						direction="column"
						wrap="wrap"
					>
						<NumberInput
							maw={70}
							label="Minutes"
							defaultValue={0}
							value={minutesLeft}
							onChange={(e) => setMinutesLeft(e)}
							min={0}
							max={60}
							parser={(value) => value.replace(/[^\d]/g, '')}
							formatter={(value) => value}
						/>
						<NumberInput
							maw={70}
							label="Seconds"
							defaultValue={0}
							value={secondsLeft}
							onChange={(e) => setSecondsLeft(e)}
							min={0}
							max={60}
							parser={(value) => value.replace(/[^\d]/g, '')}
							formatter={(value) => value}
						/>
					</Flex>

					<Flex
						mih={50}
						justify="center"
						align="center"
						direction="column"
						wrap="wrap"
					>
						<Button
							size="sm"
							m="sm"
							variant="filled"
							onClick={handleStartTimer}
						>
							Start timer
						</Button>
						<Button
							color="red"
							m="sm"
							variant="filled"
							onClick={handleStopTimer}
						>
							Stop timer
						</Button>
						<Button
							color="red"
							variant="outline"
							m="sm"
							onClick={handleResetTimer}
						>
							Reset timer
						</Button>
					</Flex>
				</Flex>
			</Paper>
		</Center>
	);
}
