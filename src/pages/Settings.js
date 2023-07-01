import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import settingsService from "../services/settings.service";
import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";

export default function Settings() {
    const [email, setEmail] = useState("");
    const [timers, setTimers] = useState([]);
	const form = useForm({
		initialValues: {
            name: '',
			password: '',
			spotifyContent: '',
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
                setTimers(settings.timers);
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

    const deleteTimer = (id) => {
        settingsService.deleteTimer(id).then((response) => {
            setTimers(timers.filter((t) => t._id !== id));
          console.log("Changed state value");
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

            <section>
                <h2>Timers</h2>

                {timers.length === 0 && <p> No timers defined ⏲️</p>}
                {timers.length !== 0 && <ul>
                    {timers.map((t) => (
                        <li key={t._id}>
                            {t.title} / {t.duration}
                            <IconTrash className="delete" onClick={() => deleteTimer(t._id)} />
                        </li>
        ))}
                    </ul>
                }
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

            <Button fullWidth mt="xl" type="submit">
            Save Settings
					</Button>
            </form>
        </div>
    
    );
}