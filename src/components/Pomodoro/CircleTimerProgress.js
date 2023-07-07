import React from 'react';
import { RingProgress, Text } from '@mantine/core';
import { TimerStatus } from '../../services/timer.service';
import { IconPlayerPause, IconPlayerPlay } from '@tabler/icons-react';

export default function CircleTimerProgress({ timerService }) {
	const remainingPercent =
		(timerService.remainingSeconds * 100) / timerService.initialTime;
	const lastSeconds = Math.min(60, timerService.remainingSeconds);
	const lastPercents = 100 * lastSeconds / timerService.initialTime;

	return (
		<RingProgress
			size={300}
			label={
				timerService.getStatus() === TimerStatus.Paused ? (
					<>
						<IconPlayerPause size={50} />
						<Text size={36} align="center">
							{timerService.getTime()}
						</Text>
					</>
				) : (
					<>
						<IconPlayerPlay size={50} />
						<Text size={36} align="center">
							{timerService.getTime()}
						</Text>
					</>
				)
			}
			sections={[
				{
					value: lastPercents,
					color: 'purple',
				},
				{
					value: lastSeconds === timerService.remainingSeconds ? 0 : remainingPercent - lastPercents,
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
