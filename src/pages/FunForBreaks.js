import { Flex } from '@mantine/core';

import Meme from '../components/Meme';
import MouseGame from '../components/MouseGame';
import { useState } from 'react';

export default function FunForBreaks() {
    const [reload, setReload] = useState(true);
	const playAgain = () => {
        setReload(!reload);
	}
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
			<MouseGame key={reload} playAgain={playAgain} />
		</Flex>
	);
}
