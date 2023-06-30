import { Checkbox, Input, TextInput, createStyles, rem } from '@mantine/core';
import { useEffect, useState } from 'react';
import businessService from '../services/business.service';

export default function ToDoList() {
	const [title, setTitle] = useState('');
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		businessService
			.getAllTasks()
			.then((response) => {
				setTasks(response.data);
			})
			.catch(console.log);
	}, []);

	const handleKeyEvent = (e) => {
		if (e.key === 'Enter' && title.length > 0) {
			businessService.createTask({ title }).then((response) => {
				setTitle('');
				setTasks([...tasks, response.data]);
			});
		}
	};

	const toggleTaskState = (id, checked) => {
		console.log('id', id, checked);
		(checked
			? businessService.setTaskDone(id)
			: businessService.setTaskDone(id)
		).then((response) => {
			console.log('Changed state value', response.data);
		});
	};

	return (
		<section>
			<Input
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

			{/* //           <TextInput
    //     label="Add a new task"
    //     placeholder="Title of the new task"
    //     required
    //     // classNames={classes}
    //     value={value}
    //     onChange={(event) => setValue(event.currentTarget.value)}
    //     // onFocus={() => setFocused(true)}
    //     // onBlur={() => setFocused(false)}
    //     mt="md"
    //     autoComplete="nope"
    //   /> */}
			<ul>
				{tasks.map((t, i) => (
					<li key={t._id}>
						<Checkbox
							value={t.finishedDate ? 'on' : 'off'}
							label={t.title}
							onChange={(e) => toggleTaskState(t._id, e.target.checked)}
						/>
					</li>
				))}
			</ul>
		</section>
	);
}
