import { Flex } from '@mantine/core';
import ToDoList from '../components/ToDoList';
import { useEffect, useState } from 'react';
import settingsService from '../services/settings.service';
import PomodoroControls from '../components/Pomodoro/PomodoroControls';
import CowSay from '../components/CowSay';

export default function Home({ timerService, loadNewSpotifyPlaylist }) {
	// console.log("timerService props in Home", props.timerService);
	const [settings, setSettings] = useState({});

	console.log(settings.timers);

	const defaultTimers = [
		/* {
			_id: null,
			type: 'Work',
			duration: 1800,
			owner: null,
			__v: 0,
		}, */
		{
			_id: null,
			type: 'Work',
			duration: 2700,
			owner: null,
			__v: 0,
		},
		{
			_id: null,
			type: 'Break',
			duration: 60,
			owner: null,
			__v: 0,
		},
		{
			_id: null,
			type: 'Break',
			duration: 360,
			owner: null,
			__v: 0,
		},
		/* {
			_id: null,
			type: 'Break',
			duration: 480,
			owner: null,
			__v: 0,
		}, */
		{
			_id: null,
			type: 'Break',
			duration: 720,
			owner: null,
			__v: 0,
		},
	];

	useEffect(() => {
		Notification.requestPermission();

		if (!localStorage.getItem('authToken')) {
			console.log("User not loggued");
			return;
		}

		settingsService
			.getSettings()
			.then((response) => {
				const settings = response.data;
				// console.log("settings", settings);
				setSettings(settings);
				loadNewSpotifyPlaylist(settings?.spotifyContent);
			})
			.catch((e) => {
				// const errorDescription = e.response.data.message;
				// setErrorMessage(errorDescription);
				console.error("Error getting user settings", e);
			});
	}, []);

	return (
		<Flex mih={50} gap="md" justify="space-around" direction="row" wrap="wrap">
			<PomodoroControls
				timerService={timerService}
				timers={settings?.timers || defaultTimers}
			/>
			<ToDoList />
			<CowSay friends={settings?.friends} />
		</Flex>
	);
}
