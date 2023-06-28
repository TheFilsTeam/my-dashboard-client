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

export default function SignIn() {
	return (
		<Container size={520} my={60}>
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
				<TextInput label="Email" placeholder="your@email.com" required />
				<PasswordInput
					label="Password"
					placeholder="Your password"
					required
					mt="md"
				/>

				<Button fullWidth mt="xl">
					Sign in
				</Button>
			</Paper>
		</Container>
	);
}
