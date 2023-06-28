import './App.css';
import { Routes, Route } from 'react-router-dom';
import Shell from './components/Shell';
import SignIn from './pages/SignIn';
import CreateAccount from './pages/CreateAccount';

function App() {
	const clickMe = () => {
		{
			console.log('clicked');
		}
	};
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Shell />}>
					<Route path="/login" element={<SignIn />} />
					<Route path="/create-account" element={<CreateAccount />} />
				</Route>
			</Routes>

			{/* <Shell></Shell> */}
		</div>
	);
}

export default App;
