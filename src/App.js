import './App.css';

import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import Settings from './pages/Settings';
import Home from './pages/Home';
import { TimerService, TimerStatus } from './services/timer.service';
import { HeaderResponsive } from './components/Header';
import FunForBreaks from './pages/FunForBreaks';
import { Whiteboard } from 'react-whiteboard-pdf';
import ThemeProvider from './context/mantineTheme.context';

function App() {
	const [spotifyUrl, setSpotifyUrl] = useState("https://open.spotify.com/playlist/0phnQZXFbsLfC0nuYjrFTi");
	const [timerStatus, setTimerStatus] = useState(TimerStatus.Stopped);
	const [remainingSeconds, setRemainingSeconds] = useState(0);
	const [timerService, setTimerService] = useState(
		new TimerService(setTimerStatus, setRemainingSeconds)
	);

	const loadNewSpotifyPlaylist = (playlistUrl) => {
		if (playlistUrl !== spotifyUrl) {
			setSpotifyUrl(playlistUrl);
		}
	}

	timerService.trackElapsedTime();
	console.log('timer type: ', timerService.timerType);

	return (
		<div className="App">
			<ThemeProvider timerService={timerService}>
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
								<HeaderResponsive timerService={timerService} spotifyUrl={spotifyUrl}  />
							</IsPrivate>
						}
					>
						<Route path="/" element={<Home timerService={timerService} loadNewSpotifyPlaylist={loadNewSpotifyPlaylist} />} />
						<Route path="/settings" element={<Settings loadNewSpotifyPlaylist={loadNewSpotifyPlaylist} />} />
						<Route path="/fun" element={<FunForBreaks />} />
						<Route
							path="/whiteboard"
							element={
								<div style={{ width: '100%', height: '90vh' }}>
									{' '}
									<Whiteboard />
								</div>
							}
						/>
					</Route>
				</Routes>
			</ThemeProvider>
		</div>
	);
}

export default App;
