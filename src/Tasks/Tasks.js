import React, { useEffect, useState } from 'react';
import { Checkbox, TextField, Stack, Button, Divider, Typography, Snackbar } from '@mui/material/';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAuth } from "../Authentication/useAuth";
import { GetTasksForUser, CreateTask, DeleteTask, UpdateTask } from '../Requests/TaskRequest';
import { useAchievementCounter } from "./useAchievementCounter";
import './Tasks.css';

function TasksPage() {
	const auth = useAuth();
	const userid = auth.user.data.id;
	// const userid = 1;

	const [todos, setTodos] = useState([]);
	const [value, setValue] = useState("");

	const { startCount, isSnackbarOpen, timesTaskChecked } = useAchievementCounter();

	// const [input, setInput] = React.useState([]);

	useEffect(() => {
		getTasks();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getTasks = async () => {
		const body = await GetTasksForUser(userid);
		setTodos(body.data);
	}

	const addTasks = async () => {
		if(value === "") {
			alert("Task cannot be empty!");
			return;
		}
		const body = await CreateTask(value, false, userid);
		setTodos(todos.concat(body.data));
	}

	const deleteTask = async(id) => {
		await DeleteTask(id);
		setTodos(todos.filter(x => x.id !== id));
	}

	const updateTask = async(task) => {
		await UpdateTask(task.id, task.content, task.done, task.userid);
	}

	const renderAchievement = () => {
		// switch (timesTaskChecked) {
		// 	case 1:
		// 		return <Snackbar autoHideDuration={3000} open={snackbarOpen} message="1 раз"/>
		// }
		return (
			<Snackbar
				open={isSnackbarOpen}
				message={`${timesTaskChecked} раз`}
			/>
		)
	}

	const onTaskChecked = (task) => {
		setTodos(prev => prev.map(x => {
			if(x.id === task.id) {
				x.done = x.done === 1 ? 0 : 1;
			}
			return x;
		}));

		updateTask(task);

		startCount();
	}

	const onTaskContentChanged = (task, event) => {
		task.content = event.target.value;

		updateTask(task);
	}

	return (
		<div className='tasks'>
			<Stack className="input" direction="row" alignItems="stretch" justifyContent="center" spacing={2}>
				<TextField
					label='Add a todo task'
					variant="outlined"
					color="primary"
					className="inputTextField"
					onChange = {(event) => {setValue(event.target.value)}}
				/>
				<Button className="inputButton" variant="contained" onClick={addTasks}>Add</Button>
			</Stack>
				<Stack
					spacing={3}
					className="todoList"
					// divider={<Divider orientation="horizontal" color="secondary" flexItem />}
				>
					{
						todos.map((todo, todoIndex) => {
							return(
								<div key={todoIndex}>
									<Stack justifyContent="space-between" direction="row" alignItems="center" spacing={3}>
										<Checkbox
											key={todo.id}
											checked={todo.done === 1}
											onChange={() => {
												onTaskChecked(todo)
											}}/>
										<TextField
											hiddenLabel
											fullWidth
											variant="standard"
											defaultValue={todo.content}
											onBlur={(event) => onTaskContentChanged(todo, event)}
											style={{textDecoration: todo.done ? "line-through" : "none"}}
										/>
										<Button color="secondary" onClick={() => deleteTask(todo.id)}>
											<DeleteForeverIcon/>
										</Button>
									</Stack>
								</div>
							);
						})
					}
				</Stack>
				{ renderAchievement() }
		</div>
	);
}
export default TasksPage;
