import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import settingsService from "../services/settings.service";
import { useEffect, useState } from "react";

export default function Settings() {
    const [email, setEmail] = useState("");
	const form = useForm({
		initialValues: {
            name: '',
			password: '',
		},

		// validate: {
		// 	email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		// },
	});

    useEffect(() => {
		settingsService
			.getSettings()
			.then((response) => {
                const settings = response.data;
				console.log("settings", settings);
                form.setValues(settings);
                setEmail(settings.email);
			})
			.catch((e) => {
				const errorDescription = e.response.data.message;
				// setErrorMessage(errorDescription);
				console.error(errorDescription);
			});
    }, [])

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
			});
	};


    return (
    
        <div>
            <h1>Settings</h1>
            <p>your email: {email}</p>
			<form onSubmit={saveSettings}>

            <section>
                <h2>User</h2>
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


            <Button fullWidth mt="xl" type="submit">
            Save Settings
					</Button>
            </form>
        </div>
    
    );
}