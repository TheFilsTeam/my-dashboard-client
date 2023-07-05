import { Flex, Button, NumberInput, Center, Paper } from '@mantine/core';
import React, { useState } from 'react';
import { TimerStatus } from '../../services/timer.service';
import CircleTimerProgress from './CircleTimerProgress';

export default function PomodoroControls({ timerService, timers }) {
	// console.log("timerService props in PomodoroControls", timerService);
	/* const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0); */

	if (!timerService) {
		return <div></div>;
	}

	return (
		<Center>
			<Paper maw={600} shadow="xs" p="md">
				<Flex
					mih={50}
					gap="md"
					justify="center"
					align="center"
					direction="column"
					wrap="wrap"
				>
					{/* Timer buttons from settings */}
					{timerService.getStatus() !== TimerStatus.InProgress && timers && (
						<>
							<Flex
								mih={50}
								gap="md"
								m="sm"
								justify="center"
								align="center"
								direction="row"
								wrap="wrap"
							>
								{timers.map((t) => (
									<Button
										key={`${t.type}-${t.duration}`}
										color={t.type === 'Work' ? 'red' : 'green'}
										miw={80}
										onClick={() => {
											/* setSeconds(+t.duration); */
											timerService.setInitialTime(+t.duration);
										}}
									>
										<center>
											{t.type} <br />{' '}
											{Math.floor(t.duration / 60) +
												':' +
												`${t.duration % 60}`.padStart(2, '0')}
										</center>
									</Button>
								))}
							</Flex>
						</>
					)}

					{/* Timer display */}
					<Flex
						mih={50}
						gap="md"
						m="sm"
						justify="center"
						align="center"
						direction="row"
						wrap="wrap"
					>
						<CircleTimerProgress timerService={timerService} />
					</Flex>

					{/* Start-Pause Buttons */}
					<Flex
						mih={50}
						justify="center"
						align="center"
						direction="row"
						wrap="wrap"
						gap="md"
					>
						{timerService.getStatus() === TimerStatus.Stopped && (
							<Button
								variant="filled"
								onClick={() =>
									timerService.startTimer(
										timerService.remainingSeconds

										/* minutes * 60 + seconds */
									)
								}
							>
								Start
							</Button>
						)}

						{timerService.getStatus() === TimerStatus.InProgress && (
							<Button
								color="green"
								variant="outline"
								onClick={timerService.toggleTimer}
							>
								Pause
							</Button>
						)}

						{timerService.getStatus() === TimerStatus.Paused && (
							<Button
								color="green"
								variant="filled"
								onClick={timerService.toggleTimer}
							>
								Start
							</Button>
						)}

						{timerService.getStatus() === TimerStatus.Paused ||
							(timerService.getStatus() === TimerStatus.InProgress && (
								<Button
									color="red"
									variant="filled"
									onClick={timerService.stopTimer}
								>
									Stop
								</Button>
							))}
					</Flex>
				</Flex>
			</Paper>
		</Center>
	);
}
