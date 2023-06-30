import './App.css';

import {
	Routes,
	Route,
} from 'react-router-dom';
import { useState, useRef } from 'react';
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
								<Shell />
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
