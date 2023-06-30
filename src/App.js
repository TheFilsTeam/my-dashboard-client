import './App.css';

import { Routes, Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { MantineProvider } from '@mantine/core';

import Shell from './components/Shell';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import Settings from './pages/Settings';
import Home from './pages/Home';

function App() {
	const [timerStatus, setTimerStatus] = useState('stopped');
	const timerRef = useRef(null);
	const [remainingSeconds, setRemainingSeconds] = useState(0);

	console.log(remainingSeconds);
	//Timer function
	useEffect(() => {
		console.log('in use effect');
		if (timerStatus === 'launching') {
			console.log('Launching...', remainingSeconds);
			setTimerStatus('running');
			timerRef.current = setInterval(() => {
				console.log('Ticking....Updating value....');
				setRemainingSeconds((prevRemainingSeconds) => {
					const newValue = prevRemainingSeconds - 1;
					console.log('newValue', newValue);
					return newValue;
				});
			}, 1000);
		}
		return () => {
			/* clearInterval(timerRef.current); */
		};
	}, [timerStatus]);

	if (timerStatus === 'running' && remainingSeconds <= 0) {
		setTimerStatus('stopped');
		alert('Time is up!');
		clearInterval(timerRef.current);
	}

	return (
		<div className="App">
			<MantineProvider>
				<Routes>
					<Route
						path="/login"
						element={
							<IsAnon>
								<SignIn />
							</IsAnon>
						}
					/>
					<Route
						path="/create-account"
						element={
							<IsAnon>
								<CreateAccount />
							</IsAnon>
						}
					/>
					<Route
						path="/"
						element={
							<IsPrivate>
								<Shell remainingSeconds={remainingSeconds} />
							</IsPrivate>
						}
					>
						<Route
							path="/"
							element={
								<Home
									remainingSeconds={remainingSeconds}
									setRemainingSeconds={setRemainingSeconds}
									timerStatus={timerStatus}
									setTimerStatus={setTimerStatus}
									timerRef={timerRef}
								/>
							}
						/>
						<Route path="/settings" element={<Settings />} />
					</Route>
				</Routes>
			</MantineProvider>
		</div>
	);
}

export default App;
