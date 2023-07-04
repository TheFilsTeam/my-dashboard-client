import { Progress } from '@mantine/core';
import { TimerStatus } from '../../services/timer.service';
import React from 'react';

export default function TimerBar({ timerService }) {
	console.log('remaining seconds: ', timerService.remainingSeconds);
	console.log('initial time: ', timerService.initialTime);
	return (
		<>
			{timerService.getStatus() === TimerStatus.InProgress && (
				<Progress
					value={
						(timerService.remainingSeconds * 100) / timerService.initialTime
					}
					radius="xs"
					size="xs"
				/>
			)}
		</>
	);
}
