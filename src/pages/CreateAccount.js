import {
	TextInput,
	PasswordInput,
	Checkbox,
	Anchor,
	Paper,
	Title,
	Text,
	Container,
	Group,
	Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

export default function CreateAccount() {
	const navigate = useNavigate();
	const form = useForm({
		initialValues: {
			email: '',
			name: '',
			password: '',
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	const signUp = (e) => {
		e.preventDefault();
		const { email, name, password } = form.values;

		console.log(email, name, password);
		authService.signup({ email, name, password })
			.then((response) => {
				console.log(response.data);
				navigate('/login');
			})
			.catch((e) => console.log('error creating account', e));
	};

	return (
		<Container size={520} my={60}>
			<form onSubmit={signUp}>
				<Title
					align="center"
					sx={(theme) => ({
						fontFamily: `Greycliff CF, ${theme.fontFamily}`,
						fontWeight: 900,
					})}
				>
					Join us!
				</Title>
				<Text color="dimmed" size="sm" align="center" mt={5}>
					Boost your productivity today.
				</Text>

				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<TextInput
						label="Email"
						placeholder="your@email.com"
						{...form.getInputProps('email')}
						required
					/>
					<TextInput
						label="Name"
						placeholder="Your name"
						{...form.getInputProps('name')}
						required
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						{...form.getInputProps('password')}
						required
						mt="md"
					/>

					<Button fullWidth mt="xl" type="submit">
						Register
					</Button>
				</Paper>
			</form>
		</Container>
	);
}
