import React from 'react';

import { RingProgress, Text } from '@mantine/core';

export default function CircleTimerProgress({
	timerService,
	minutes,
	seconds,
}) {
	let remainingPercent =
		(timerService.remainingSeconds * 100) / timerService.initialTime;

	return (
		<RingProgress
			label={
				<Text size="md" align="center">
					{timerService.getTime()}
				</Text>
			}
			sections={[
				{
					value: remainingPercent,
					color: 'blue',
				},
				{
					value: 100 - remainingPercent,
					color: 'gray',
				},
			]}
		/>
	);
}
