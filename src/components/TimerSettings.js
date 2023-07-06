import React from 'react';
import settingsService from '../services/settings.service';

import {
	Button,
	Container,
	Paper,
	NumberInput,
	Text,
	Radio,
	Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';

export default function TimerSettings({ validateTimer, timer, timerError }) {
	//test
	const initialValues = {
		type: 'Work',
		duration: 5,
	};

	if (timer) {
		initialValues.type = timer.type;
		initialValues.duration = timer.duration / 60;
	}
	const form = useForm({
		initialValues,
	});

	/* const createTimer = () => {
		const { duration, type } = form.values;
		console.log(form.values);
		settingsService
			.createTimer({ duration, type })
			.then((response) => validateTimer(response.data))
			.catch((e) => console.log('error: ', e));
	}; */

	const validate = (e) => {
		e.preventDefault();
		const { duration, type } = form.values;
		validateTimer({ duration: duration * 60, type });
	};

	console.log(form.values);

	return (
		<>
			<Container>
				<form onSubmit={validate}>
					<Paper shadow="md" mb={25} p={30} radius="md">
						{timerError && (
							<Text size="sm" color="red">
								{timerError}
							</Text>
						)}
						<Radio.Group
							name="type"
							label="Type of timer"
							value={form.values.type}
							onChange={(value) => form.setFieldValue('type', value)}
							description="Define the type of timer this will be"
							withAsterisk
						>
							<Group mt="xs">
								<Radio value="Work" label="Work" />
								<Radio value="Break" label="Break" />
							</Group>
						</Radio.Group>
						<NumberInput
							label="Duration (minutes)"
							name="duration"
							min={0}
							max={60}
							placeholder="number of minutes"
							{...form.getInputProps('duration')}
							required
						/>

						<Button fullWidth mt="xl" type="submit">
							Validate
						</Button>
					</Paper>
				</form>
			</Container>
		</>
	);
}
