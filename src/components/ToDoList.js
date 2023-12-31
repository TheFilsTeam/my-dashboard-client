import { Paper, Checkbox, Input, Title, Text } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import taskService from '../services/task.service';
import { IconTrash } from '@tabler/icons-react';
import { AuthContext } from '../context/auth.context';

export default function ToDoList() {
	const [title, setTitle] = useState('');
	const [tasks, setTasks] = useState([]);
	const { user, logOutUser } = useContext(AuthContext);

	useEffect(() => {
		taskService
			.getAllTasks()
			.then((response) => setTasks(response.data))
			.catch(console.log);
	}, []);

	const handleKeyEvent = (e) => {
		if (e.key === 'Enter' && title.length > 0) {
			taskService.createTask({ title }).then((response) => {
				setTitle('');
				setTasks([...tasks, response.data]);
			});
		}
	};

	const deleteTask = (id) => {
		taskService.deleteTask(id).then((response) => {
			setTasks(tasks.filter((t) => t._id !== id));
			console.log('Changed state value');
		});
	};

	const toggleTaskState = (id, checked) => {
		console.log('id', id, checked);
		taskService.updateTaskStatus(id, checked).then((response) => {
			const updatedTask = response.data;
			setTasks(tasks.map((t) => (t._id === updatedTask._id ? updatedTask : t)));
			console.log('Changed state value');
		});
	};

	return (
		<Paper
			maw={600}
			miw={300}
			shadow="md"
			p="md"
			className="items-list todo-list"
		>
			<Title order={1} color="grey" size={15} align="left">
				📃 To-do list
			</Title>
			{user ? (
				<Input
					id="add-task"
					label="Add a new task"
					placeholder="Title of the new task"
					required
					// classNames={classes}
					value={title}
					onChange={(e) => setTitle(e.currentTarget.value)}
					onKeyUp={(e) => handleKeyEvent(e)}
					mt="md"
					autoComplete="nope"
				/>
			) : (
				<Text mt={20} fz={'sm'}>
					Feature only available for registered users
				</Text>
			)}

			<ul>
				{tasks.map((t) => (
					<li key={t._id}>
						<Checkbox
							checked={t.finishedDate ? 'true' : ''}
							label={t.title}
							className={t.finishedDate ? 'done' : 'in-progress'}
							onChange={(e) => toggleTaskState(t._id, e.target.checked)}
						/>
						<IconTrash className="hover" onClick={() => deleteTask(t._id)} />
					</li>
				))}
			</ul>
		</Paper>
	);
}
