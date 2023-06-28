import './App.css';
import { AppShell, Button } from '@mantine/core';
import Shell from './components/Shell';

function App() {
	const clickMe = () => {
		{
			console.log('clicked');
		}
	};
	return (
		<div className="App">
			<Shell></Shell>
		</div>
	);
}

export default App;
