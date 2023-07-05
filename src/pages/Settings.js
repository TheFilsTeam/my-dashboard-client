import {
	Button,
	Container,
	Flex,
	Modal,
	Paper,
	Text,
	TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import settingsService from '../services/settings.service';
import { useEffect, useState } from 'react';
import { IconTrash, IconEdit } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import TimerSettings from '../components/TimerSettings';

export default function Settings() {
	const [email, setEmail] = useState('');
	const [timers, setTimers] = useState([]);
	const [opened, { open, close }] = useDisclosure(false);
	const [currentTimer, setCurrentTimer] = useState(null);
	const [timerError, setTimerError] = useState(null);
	const [settingsError, setSettingsError] = useState(null);

	// #region Form handling

	const form = useForm({
		initialValues: {
			name: '',
			/* password: '', */
			spotifyContent: '',
		},

		/* validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		}, */
	});

	useEffect(() => {
		settingsService
			.getSettings()
			.then((response) => {
				const settings = response.data;
				form.setValues(settings);
				setEmail(settings.email);
				setTimers(settings.timers);
			})
			.catch((e) => {
				const errorDescription = e.response.data.message;
				// setErrorMessage(errorDescription);
				console.error(errorDescription);
			});
	}, []);

	const saveSettings = (e) => {
		e.preventDefault();
		console.log(`req.body (data to update)`, form.values);

		settingsService
			.updateSettings(form.values)
			.then((response) => {
				console.log(response.data);
			})
			.catch((e) => {
				const errorDescription = e.response.data.message;
				// setErrorMessage(errorDescription);
				console.error(errorDescription);
				setSettingsError(errorDescription);
			});
	};

	// #endregion

	// #region Timer CRUD

	const addNewTimer = () => {
		setCurrentTimer(null);

		open();
	};

	const createTimer = (newTimer) => {
		//TODO Call to api
		settingsService.createTimer(newTimer).then((response) => {});

		setTimers([...timers, newTimer]);
		close();
	};

	const deleteTimer = (id) => {
		console.log('try delete timer...', id);
		settingsService
			.deleteTimer(id)
			.then((response) => {
				console.log('timer deleted');
				setTimers(timers.filter((t) => t._id !== id));
			})
			.catch((e) => {
				console.log('error', e);
				setTimerError(e);
			});
	};

	const editTimer = (id) => {
		setCurrentTimer(timers.find((timer) => timer._id === id));

		open();
	};

	const updateTimer = (timer) => {
		const updatedTimer = { ...timer, _id: currentTimer._id };
		settingsService
			.updateTimer(currentTimer._id, timer)
			.then((response) => {
				const newTimers = timers.map((element) =>
					element._id === currentTimer._id ? updatedTimer : element
				);
				setTimers(newTimers);
				close();
			})
			.catch((e) => {
				console.log(e);
				setTimerError(e);
			});
	};
	// #endregion

	return (
		<>
			<form onSubmit={saveSettings}>
				<h1>Settings</h1>
				<Flex wrap="wrap" justify="space-around" align="center" direction="row">
					<Container miw={500} m="lg">
						<Paper p={'md'} shadow="md">
							<section>
								<h2>User</h2>
								<p>your email: {email}</p>
								<TextInput
									label="Name"
									name="username"
									placeholder="Your name"
									{...form.getInputProps('name')}
									required
								/>
								{/* <PasswordInput
						label="Password"
						placeholder="Your password"
						{...form.getInputProps('password')}
						required
						mt="md"
					/> */}
							</section>
							<section>
								<h2>Spotify</h2>
								<TextInput
									label="Spotify playlist"
									name="spotifyContent"
									placeholder="a spotify playlist or album url"
									{...form.getInputProps('spotifyContent')}
									required
								/>
							</section>
						</Paper>
					</Container>

					<Container m="lg" /* TIMERS */>
						<section>
							{timers.length === 0 && <p> No timers defined ⏲️</p>}

							{timers.length !== 0 && (
								<>
									<Flex
										direction={'row'}
										justify="center"
										align="center"
										mt={20}
										mb={20}
										wrap="wrap"
									>
										<Paper shadow="md">
											<h2>Timers</h2>
											{timerError && (
												<Text size="sm" color="red">
													{timerError}
												</Text>
											)}
											{/* WORK TIMERS MAP */}
											<Container
												miw={300}
												shadow="md"
												p="md"
												withBorder
												className="items-list"
											>
												<Text>Work</Text>
												{timers
													.filter((t) => t.type === 'Work')
													.map((t) => (
														<ul>
															<li key={t._id}>
																{t.type} ({t.duration / 60} min)
																<Flex>
																	<IconEdit
																		onClick={() => editTimer(t._id)}
																		className="hover"
																	/>
																	<IconTrash
																		onClick={() => deleteTimer(t._id)}
																		className="hover"
																	/>
																</Flex>
															</li>
														</ul>
													))}
											</Container>
											{/* BREAK TIMERS MAP */}
											<Container
												miw={300}
												shadow="md"
												p="md"
												withBorder
												className="items-list"
											>
												<Text>Break</Text>
												{timers
													.filter((t) => t.type === 'Break')
													.map((t) => (
														<ul>
															<li key={t._id}>
																{t.type} ({t.duration / 60} min)
																<Flex>
																	<IconEdit
																		onClick={() => editTimer(t._id)}
																		className="hover"
																	/>
																	<IconTrash
																		onClick={() => deleteTimer(t._id)}
																		className="hover"
																	/>
																</Flex>
															</li>
														</ul>
													))}
											</Container>
											<Button mb={20} onClick={addNewTimer}>
												Create new timer
											</Button>
										</Paper>
									</Flex>
								</>
							)}
						</section>
					</Container>
				</Flex>
				<Container>
					{settingsError && (
						<Text size="sm" color="red">
							{settingsError}
						</Text>
					)}

					<Button /* fullWidth */ mt="xl" type="submit">
						Save Settings
					</Button>
				</Container>
			</form>
			<Modal
				opened={opened}
				onClose={close}
				title={currentTimer ? 'Edit timer' : 'Create timer'}
				centered
			>
				{/* Modal content */}

				<TimerSettings
					closeModal={close}
					timer={currentTimer}
					validateTimer={currentTimer ? updateTimer : createTimer}
					timerError={timerError}
				/>

				{/* Button OnSubmit={validate} */}
			</Modal>

			{/* <Group position="center">
				<Button onClick={open}>Open centered Modal</Button>
			</Group> */}
		</>
	);
}
