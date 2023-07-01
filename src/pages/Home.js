import { Container, Flex } from '@mantine/core';
import ToDoList from '../components/ToDoList';
import Pomodoro from '../components/Pomodoro';
import Spotify from "../components/Spotify";
import { useEffect, useState } from "react";
import settingsService from "../services/settings.service";

export default function Home(props) {

  const [settings, setSettings] = useState({});
  useEffect(() => {
    Notification.requestPermission();
    
		settingsService
			.getSettings()
			.then((response) => {
        const settings = response.data;
				console.log("settings", settings);
        setSettings(settings);
			})
			.catch((e) => {
				const errorDescription = e.response.data.message;
				// setErrorMessage(errorDescription);
				console.error(errorDescription);
			});
    }, [])

	return (
		<Container fluid>
			<h1>restricted home page 👍</h1>
			<Flex
				mih={50}
				gap="md"
				justify="space-between"
				align="flex-start"
				direction="row"
				wrap="wrap"
			>
				<ToDoList />
				<Pomodoro
					remainingSeconds={props.remainingSeconds}
					setRemainingSeconds={props.setRemainingSeconds}
					timerStatus={props.timerStatus}
					setTimerStatus={props.setTimerStatus}
					timerRef={props.timerRef}
				/>
	        <Spotify contentUrl={settings.spotifyContent}/>
			</Flex>
		</Container>
	);
}
