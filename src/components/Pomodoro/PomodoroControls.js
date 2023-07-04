import { Flex, Button, NumberInput, Center, Paper } from '@mantine/core';
import React, { useState } from 'react';
import { TimerStatus } from '../../services/timer.service';
import CircleTimerProgress from './CircleTimerProgress';

export default function PomodoroControls({
	timerService,
	timers,
}) {
	// console.log("timerService props in PomodoroControls", timerService);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

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
					<Flex
						mih={50}
						gap="md"
						m="sm"
						justify="center"
						align="center"
						direction="row"
						wrap="wrap"
					>
						{timerService.getStatus() !== TimerStatus.InProgress && timers && (
							<>
								{timers.map((t) => (
									<Button
										key={`${t.type}-${t.duration}`}
										color={t.type === 'Work' ? 'red' : 'green'}
										miw={80}
										onClick={() => {
											setSeconds(+t.duration);
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
							</>
						)}
						{/* {timerService.getStatus() !== TimerStatus.InProgress && (
							<>
								<Button miw={80} onClick={() => setMinutes(minutes + 5)}>
									+30s
								</Button>
								<Button miw={80} onClick={() => setMinutes(minutes + 10)}>
									+1m
								</Button>
								<Button miw={80} onClick={() => setMinutes(minutes + 15)}>
									+2m
								</Button>
							</>
						)} */}
					</Flex>

					{/* Timer display */}
					{/* {timerService.getStatus() === TimerStatus.InProgress && ( */}
					<Flex
						mih={50}
						gap="md"
						m="sm"
						justify="center"
						align="center"
						direction="row"
						wrap="wrap"
					>
						{/* {Math.floor(seconds / 60) +
								':' +
								`${seconds % 60}`.padStart(2, '0')} */}
						{/* <NumberInput
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
							/> */}
						<CircleTimerProgress
							timerService={timerService}
							minutes={minutes}
							seconds={seconds}
						/>
					</Flex>
					{/* )} */}

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
								onClick={() => timerService.startTimer(minutes * 60 + seconds)}
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
					</Flex>
				</Flex>
			</Paper>
		</Center>
	);
}
