import {
	TextInput,
	PasswordInput,
	Paper,
	Title,
	Text,
	Container,
	Button,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';

export default function SignIn() {
	const { storeToken, authenticateUser } = useContext(AuthContext);
	const [errorMessage, setErrorMessage] = useState(null);

	const navigate = useNavigate();
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
		const { email, password } = form.values;
		authService
			.login({ email, password })
			.then((response) => {
				console.log(response.data);
				storeToken(response.data.authToken);
				authenticateUser();
				navigate('/');
			})
			.catch((e) => {
				setErrorMessage(e.response.data.message);
				const errorDescription = e.response.data.message;
				// setErrorMessage(errorDescription);
				console.log(errorDescription);
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
					<Link style={{ textDecoration: 'none' }} to="/create-account">
						Create account
					</Link>
				</Text>

				<Paper withBorder shadow="md" p={30} mt={30} radius="md">
					{errorMessage && (
						<Text size="sm" color="red">
							{errorMessage}
						</Text>
					)}
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
