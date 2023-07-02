import React from 'react';
import { Flex, Text } from '@mantine/core';

export default function PomodoroSummary(props) {
	return (
		<Flex
			mih={50}
			gap="md"
			justify="center"
			align="center"
			direction="row"
			wrap="wrap"
		>
			{/* <Text>Pomodoro Timer:</Text> */}
			<Text>{props.timerService.getTime()}</Text>
		</Flex>
	);
}
