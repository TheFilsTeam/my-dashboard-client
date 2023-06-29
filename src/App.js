import './App.css';
import { Routes, Route } from 'react-router-dom';
import Shell from './components/Shell';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';
import Settings from './pages/Settings';
import Home from './pages/Home';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Shell />}>
					<Route path="/login" element={<IsAnon><SignIn /></IsAnon>} />
					<Route path="/create-account" element={<IsAnon><CreateAccount /></IsAnon>} />
					<Route path="/" element={<IsPrivate><Home /></IsPrivate>} />
					<Route path="/settings" element={<IsPrivate><Settings /></IsPrivate>} />
				</Route>
			</Routes>

			{/* <Shell></Shell> */}
		</div>
	);
}

export default App;
