import { Checkbox, Input, TextInput, createStyles, rem } from '@mantine/core';
import { useEffect, useState } from "react";
import businessService from '../services/business.service';

export default function ToDoList() {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        businessService.getAllTasks()
            .then(response => setTasks(response.data))
            .catch(console.log)
    }, [])

    const handleKeyEvent = e => {
        if(e.key === "Enter" && title.length > 0) {
            businessService.createTask({title})
                .then(response => {
                    setTitle("");
                    setTasks([...tasks, response.data]);
                })
        }
    }

    const toggleTaskState = (id, checked) => {
        console.log("id", id, checked);
        businessService.updateTaskStatus(id, checked)
           .then(response => {
                const updatedTask = response.data;
                setTasks(tasks.map(t => t._id === updatedTask._id ? updatedTask : t));
                console.log("Changed state value", );
            });
    }

    return(
        <section id="todo-list">
            <Input
            label="Add a new task"
            placeholder="Title of the new task"
            required
            // classNames={classes}
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
            onKeyUp={e => handleKeyEvent(e)}
            mt="md"
            autoComplete="nope"
        />

        <ul>
            {tasks.map(t => <li key={t._id}>
            <Checkbox checked={t.finishedDate ? "true" : ""}
                label={t.title}
                className={t.finishedDate ? "done" : "in-progress"}
                onChange={e => toggleTaskState(t._id, e.target.checked)} />
            </li>)}
        </ul>
        </section>
    )
}