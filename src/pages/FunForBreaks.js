import { Flex } from '@mantine/core';

import Meme from '../components/Meme';

export default function FunForBreaks() {
	return (
		<Flex
			mih={50}
			gap="md"
			justify="space-around"
			align="flex-start"
			direction="row"
			wrap="wrap"
		>
			<Meme />
		</Flex>
	);
}
