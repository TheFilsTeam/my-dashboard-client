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
import { Excalidraw, LiveCollaborationTrigger, WelcomeScreen } from '@excalidraw/excalidraw';
import ThemeProvider from './context/mantineTheme.context';
// import initialData from "./initialExcalidrawData";

// Load already downloaded library from https://libraries.excalidraw.com
// and append '.json' to the file to be able to load it
import webLib from "./excalidrawLibraries/html-css-js-icons.excalidrawlib.json";
import itLib from "./excalidrawLibraries/it-icons.excalidrawlib.json";
import uiLib from "./excalidrawLibraries/universal-ui-kit.excalidrawlib.json";
import jsTypesLib from "./excalidrawLibraries/types-and-values-in-javascript.excalidrawlib.json";
import githubLib from "./excalidrawLibraries/github-icons.excalidrawlib.json";
import uxLib from "./excalidrawLibraries/basic-ux-wireframing-elements.excalidrawlib.json";
import shapesLib from "./excalidrawLibraries/basic-shapes.excalidrawlib.json";
import devopsLib from "./excalidrawLibraries/dev_ops.excalidrawlib.json";
import formsLib from "./excalidrawLibraries/forms.excalidrawlib.json";
import frontLib from "./excalidrawLibraries/front-end-tech-and-tools.excalidrawlib.json";
import hexaLib from "./excalidrawLibraries/hexagonal-architecture.excalidrawlib.json";
import componentsLib from "./excalidrawLibraries/systems-design-components.excalidrawlib.json";
const libs = [webLib, itLib, uiLib, jsTypesLib, uxLib, shapesLib, frontLib, componentsLib, formsLib, devopsLib, githubLib, hexaLib];

function App() {
	const [spotifyUrl, setSpotifyUrl] = useState(
		'https://open.spotify.com/playlist/0phnQZXFbsLfC0nuYjrFTi'
	);
	const [timerStatus, setTimerStatus] = useState(TimerStatus.Stopped);
	const [remainingSeconds, setRemainingSeconds] = useState(0);
	const [timerService, setTimerService] = useState(
		new TimerService(setTimerStatus, setRemainingSeconds)
	);

	const loadExcalidrawLibrary = (libraryContent)  => {
	if (libraryContent.version === 1) {
		return libraryContent.library;
	}

	if (libraryContent.version === 2) {
		return libraryContent.libraryItems.map(e => e.elements);
	}

	console.log("version not compatible");
}
	const loadNewSpotifyPlaylist = (playlistUrl) => {
		if (playlistUrl !== spotifyUrl) {
			setSpotifyUrl(playlistUrl);
		}
	};

	timerService.trackElapsedTime();
	console.log('timer type: ', timerService.timerType);

	return (
		<div className="App">
			<ThemeProvider timerService={timerService}>
				<HeaderResponsive timerService={timerService} spotifyUrl={spotifyUrl} />
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
							<Home
								timerService={timerService}
								loadNewSpotifyPlaylist={loadNewSpotifyPlaylist}
							/>
						}
					/>

					<Route
						path="/settings"
						element={
							<IsPrivate>
								<Settings loadNewSpotifyPlaylist={loadNewSpotifyPlaylist} />
							</IsPrivate>
						}
					/>

					<Route path="/fun" element={<FunForBreaks />} />
					<Route
						path="/whiteboard"
						element={
							<div style={{ width: '100%', height: '90vh' }}>
								{' '}
								<Excalidraw initialData={{ libraryItems: libs.flatMap(lib => loadExcalidrawLibrary(lib)) }} >
        							<WelcomeScreen />
      							</Excalidraw>
							</div>
						}
					/>
				</Routes>
			</ThemeProvider>
		</div>
	);
}

export default App;
