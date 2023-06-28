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
import axios from 'axios';

export default function SignIn() {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		},
	});

	const signIn = (e) => {
		e.preventDefault();
		// TODO: login
		console.log(form.values);
		const { email, password, name } = form.values;
		axios
			.post('http://localhost:5005/auth/login', { email, password })
			.then((response) => {
				console.log(response.data);
				localStorage.setItem('authToken', response.data.token);
			});
	};

	return (
		<Container size={520} my={60}>
			<form onSubmit={signIn}>
				<Title
					align="center"
					sx={(theme) => ({
						fontFamily: `Greycliff CF, ${theme.fontFamily}`,
						fontWeight: 900,
					})}
				>
					Welcome back!
				</Title>
				<Text color="dimmed" size="sm" align="center" mt={5}>
					Do not have an account yet?{' '}
					<Anchor size="sm" component="button">
						Create account
					</Anchor>
				</Text>

				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					<TextInput
						label="Email"
						placeholder="your@email.com"
						{...form.getInputProps('email')}
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
						Sign in
					</Button>
				</Paper>
			</form>
		</Container>
	);
}
