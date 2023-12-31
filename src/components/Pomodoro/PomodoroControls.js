import { Flex, Button, Paper, Title, Text } from '@mantine/core';
import React, { useContext } from 'react';
import { TimerStatus } from '../../services/timer.service';
import CircleTimerProgress from './CircleTimerProgress';
import { AuthContext } from '../../context/auth.context';

export default function PomodoroControls({ timerService, timers }) {
	const { user, logOutUser } = useContext(AuthContext);

	if (!timerService) {
		return <div></div>;
	}

	return (
		<Paper maw={600} shadow="md" p="md">
			<Title order={1} color="grey" size={15} align="left">
				⏱️ Timer / 🍅 Pomodoro
			</Title>
			{!user && (
				<Text fz={'sm'} mt={10}>
					Login to customize timers in the settings
				</Text>
			)}
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
					{timers && (
						<>
							{timers.map((t) => (
								<Button
									disabled={timerService.getStatus() === TimerStatus.InProgress}
									key={`${t.type}-${t.duration}`}
									color={t.type === 'Work' ? 'red' : 'green'}
									miw={80}
									onClick={() => {
										timerService.setInitialTime(+t.duration, t.type);
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
				</Flex>

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
	);
}
