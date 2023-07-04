import { Container, Flex } from '@mantine/core';
import ToDoList from '../components/ToDoList';
import Spotify from '../components/Spotify';
import { useEffect, useState } from 'react';
import settingsService from '../services/settings.service';
import PomodoroControls from '../components/Pomodoro/PomodoroControls';
import TimerBar from '../components/Pomodoro/TimerBar';

export default function Home({ timerService }) {
	// console.log("timerService props in Home", props.timerService);

	const [timerTotal, setTimerTotal] = useState(0);
	const [settings, setSettings] = useState({});

	useEffect(() => {
		Notification.requestPermission();

		settingsService
			.getSettings()
			.then((response) => {
				const settings = response.data;
				// console.log("settings", settings);
				setSettings(settings);
			})
			.catch((e) => {
				const errorDescription = e.response.data.message;
				// setErrorMessage(errorDescription);
				console.error(errorDescription);
			});
	}, []);

	return (
		<Container fluid>
			<TimerBar timerService={timerService} timerTotal={timerTotal} />
			<Flex
				mih={50}
				gap="md"
				justify="space-between"
				align="flex-start"
				direction="row"
				wrap="wrap"
			>
				<ToDoList />
				<PomodoroControls
					timerService={timerService}
					timers={settings?.timers}
					setTimerTotal={setTimerTotal}
				/>
				<Spotify contentUrl={settings?.spotifyContent} />
			</Flex>
		</Container>
	);
}
