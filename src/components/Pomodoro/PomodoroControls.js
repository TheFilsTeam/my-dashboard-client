import { Flex, Button, NumberInput, Center, Paper } from '@mantine/core';
import React, { useState } from 'react';

export default function PomodoroControls({timerService}) {
	// console.log("timerService props in PomodoroControls", timerService);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(15);
	if (!timerService) {
		return <div></div>;
	}

	return (<Center>
	<Paper maw={600} shadow="xs" p="md">
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
					<Button miw={80} onClick={() => setMinutes(minutes + 5)}>
						+5m
					</Button>
					<Button miw={80} onClick={() => setMinutes(minutes + 10)}>
						+10m
					</Button>
					<Button miw={80} onClick={() => setMinutes(minutes + 15)}>
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
						value={minutes}
						onChange={(e) => setMinutes(e)}
						min={0}
						max={60}
						parser={(value) => value.replace(/[^\d]/g, '')}
						formatter={(value) => value}
					/>
					<NumberInput
						maw={70}
						label="Seconds"
						defaultValue={0}
						value={seconds}
						onChange={(e) => setSeconds(e)}
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
					direction="row"
					wrap="wrap"
					gap="md"
				>
					<Button variant="filled" onClick={() => timerService.startTimer(minutes * 60 + seconds)}>
						Start
					</Button>
					{/* <Button color="red" variant="outline" onClick={timerService.pause}>
						Pause
					</Button> */}
					<Button
						color="red"
						 variant="filled"
						onClick={timerService.stopTimer}
					>
						Stop
					</Button>
				</Flex>
			</Flex>
		</Paper>
	</Center>

	);
}
