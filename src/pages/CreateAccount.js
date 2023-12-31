import {
	TextInput,
	PasswordInput,
	Paper,
	Title,
	Text,
	Container,
	Button,
	Group,
	Image,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/auth.service';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';

export default function CreateAccount() {
	const { storeToken, authenticateUser } = useContext(AuthContext);
	const [errorMessage, setErrorMessage] = useState(null);

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
		authService
			.signup({ email, name, password })
			.then((response) => {
				storeToken(response.data.authToken);
				authenticateUser();
				navigate('/');
			})
			.catch((e) => {
				setErrorMessage(e.response.data.message);
				console.log('error creating account', e.response);
			});
	};

	const size = 50;
	return (
		<>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Group spacing={5} mt={0} align="center">
					<Image
						width={size}
						height={size}
						src="./android-chrome-512x512.png"
					/>
					<Text
						mr={20}
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 900,
							fontSize: size,
						})}
					>
						Focus Dashboard
					</Text>
				</Group>
			</div>
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Group spacing={5} align="center">
					<Text
						mr={20}
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontSize: 16,
						})}
						color="grey"
					>
						All you need to get your work done.
					</Text>
				</Group>
			</div>
			<Container size={520} my={60}>
				<form onSubmit={signUp}>
					<Title
						align="center"
						sx={(theme) => ({
							fontFamily: `Greycliff CF, ${theme.fontFamily}`,
							fontWeight: 500,
						})}
					>
						Join us!
					</Title>

					<Text color="dimmed" size="sm" align="center" mt={5}>
						Already have an account?{' '}
						<Link style={{ textDecoration: 'none' }} to="/login">
							Login
						</Link>
					</Text>
					<Paper shadow="md" p={30} mt={30} radius="md">
						{errorMessage && (
							<Text size="sm" color="red">
								{errorMessage}
							</Text>
						)}
						<TextInput
							label="Email"
							name="email"
							type="email"
							placeholder="your@email.com"
							{...form.getInputProps('email')}
							required
						/>
						<TextInput
							label="Name"
							name="username"
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
		</>
	);
}
