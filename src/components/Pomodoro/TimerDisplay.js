import { Progress } from '@mantine/core';
import { TimerStatus } from '../../services/timer.service';
import React from 'react';

export default function TimerDisplay({ timerService, timerTotal }) {
	console.log(timerTotal);

	return (
		<>
			{timerService.getStatus() === TimerStatus.InProgress && (
				<Progress
					value={(timerService.remainingSeconds * 100) / timerTotal}
					striped
					animate
				/>
			)}
		</>
	);
}
