import { Flex, Button, NumberInput, Center, Paper } from '@mantine/core';
import React, { useState } from 'react';
import { TimerStatus } from '../../services/timer.service';

export default function PomodoroControls({
	timerService,
	timers,
	setTimerTotal,
}) {
	// console.log("timerService props in PomodoroControls", timerService);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(15);

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
					<Flex
						mih={50}
						gap="md"
						m="sm"
						justify="center"
						align="center"
						direction="row"
						wrap="wrap"
					>
						{timerService.getStatus() === TimerStatus.InProgress && (
							<p>{timerService.getTime()}</p>
						)}
						{timerService.getStatus() !== TimerStatus.InProgress && timers && (
							<>
								{timers.map((t) => (
									<Button
										color={t.type === 'Work' ? 'red' : 'green'}
										miw={80}
										onClick={() => setSeconds(+t.duration)}
									>
									<center>
										{t.type} <br /> {Math.floor(t.duration / 60) + ':' + `${t.duration % 60}`.padStart(2, "0")}
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
					{timerService.getStatus() !== TimerStatus.InProgress && (
						<Flex
							mih={50}
							gap="md"
							m="sm"
							justify="center"
							align="center"
							direction="row"
							wrap="wrap"
						>
							{Math.floor(seconds / 60) + ':' + `${seconds % 60}`.padStart(2, "0")}
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
						</Flex>
					)}

					<Flex
						mih={50}
						justify="center"
						align="center"
						direction="row"
						wrap="wrap"
						gap="md"
					>
						<Button
							variant="filled"
							onClick={() => {
								timerService.startTimer(minutes * 60 + seconds);
								setTimerTotal(timerService.remainingSeconds);
							}}
						>
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
							Pause
						</Button>
					</Flex>
				</Flex>
			</Paper>
		</Center>
	);
}
