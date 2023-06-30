import React, { useEffect } from 'react';
import { Paper, NumberInput, Center, Button, Flex } from '@mantine/core';

export default function Pomodoro(props) {
	useEffect(() => {
		if (props.timerStatus === 'running') {
			const startTime = Date.now();
			props.timerRef.current = setInterval(() => {
				const elapsedTime = Math.round((Date.now() - startTime) / 1000);
				const remainingTime = props.secondsLeft - elapsedTime;
				if (remainingTime >= 0 || props.minutesLeft > 0) {
					props.setSecondsLeft(remainingTime);
					props.setMinutesLeft(Math.floor(remainingTime / 60));
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
	}, [props.timerStatus]);

	const handleStartTimer = () => {
		if (props.minutesLeft > 0 || props.secondsLeft > 0) {
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
		props.setSecondsLeft(0);
		props.setMinutesLeft(0);
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
							value={props.minutesLeft}
							onChange={(e) => props.setSecondsLeft(e * 60)}
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
							onChange={(e) => props.setSecondsLeft(e)}
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
