import { Flex } from '@mantine/core';
import ToDoList from '../components/ToDoList';
import Spotify from '../components/Spotify';
import { useEffect, useState } from 'react';
import settingsService from '../services/settings.service';
import PomodoroControls from '../components/Pomodoro/PomodoroControls';
import CowSay from '../components/CowSay';

export default function Home({ timerService }) {
	// console.log("timerService props in Home", props.timerService);
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
		<Flex
			mih={50}
			gap="md"
			justify="space-around"
			align="center"
			direction="row"
			wrap="wrap"
		>
			<PomodoroControls timerService={timerService} timers={settings?.timers} />
			<ToDoList />
			<Spotify contentUrl={settings?.spotifyContent} />
			<CowSay />
		</Flex>
	);
}
