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
import { TimerService, TimerStatus } from './services/timer.service';
import { HeaderResponsive } from './components/Header';
import FunForBreaks from './pages/FunForBreaks';

function App() {
	const [timerStatus, setTimerStatus] = useState(TimerStatus.Stopped);
	const [remainingSeconds, setRemainingSeconds] = useState(0);
	const [timerService, setTimerService] = useState(
		new TimerService(setTimerStatus, setRemainingSeconds)
	);

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
								{/* <Shell timerService={timerService} /> */}
								<HeaderResponsive timerService={timerService} />
							</IsPrivate>
						}
					>
						<Route path="/" element={<Home timerService={timerService} />} />
						<Route path="/settings" element={<Settings />} />
						<Route path="/fun" element={<FunForBreaks />} />
					</Route>
				</Routes>
			</MantineProvider>
		</div>
	);
}

export default App;
