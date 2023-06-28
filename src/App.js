import './App.css';
import { Routes, Route } from 'react-router-dom';
import Shell from './components/Shell';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';
import IsPrivate from './components/IsPrivate';
import IsAnon from './components/IsAnon';

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Shell />}>
					<Route path="/login" element={<IsAnon><SignIn /></IsAnon>} />
					<Route path="/create-account" element={<IsAnon><CreateAccount /></IsAnon>} />
					<Route path="/" element={<IsPrivate><h1>restricted home page 👍</h1></IsPrivate>} />
				</Route>
			</Routes>

			{/* <Shell></Shell> */}
		</div>
	);
}

export default App;
