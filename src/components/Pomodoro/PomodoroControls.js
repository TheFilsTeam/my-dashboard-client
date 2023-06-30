import { Flex, Button, NumberInput } from '@mantine/core';
import React from 'react';

export default function PomodoroControls(props) {
	return (
		<>
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
					<Button miw={80} onClick={() => props.addToTimer(5)}>
						+5m
					</Button>
					<Button miw={80} onClick={() => props.addToTimer(10)}>
						+10m
					</Button>
					<Button miw={80} onClick={() => props.addToTimer(15)}>
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
				</Flex>

				<Flex
					mih={50}
					justify="center"
					align="center"
					direction="row"
					wrap="wrap"
					gap="md"
				>
					<Button variant="filled" onClick={props.handleStartTimer}>
						Start timer
					</Button>
					<Button color="red" variant="filled" onClick={props.handleStopTimer}>
						Stop timer
					</Button>
					<Button
						color="red"
						variant="outline"
						onClick={props.handleResetTimer}
					>
						Reset timer
					</Button>
				</Flex>
			</Flex>
		</>
	);
}
