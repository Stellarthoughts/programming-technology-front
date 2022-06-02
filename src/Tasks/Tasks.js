import React, { useEffect, useState } from 'react';
import { Checkbox, TextField, Stack,
	Button, Divider, Typography, Snackbar,
	Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material/';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useAuth } from "../Authentication/useAuth";
import { GetTasksForUser, CreateTask, DeleteTask, UpdateTask } from '../Requests/TaskRequest';
import { useAchievementCounter } from "./useAchievementCounter";
import { GetAllNewAchievementsForUser } from "../Requests/AchievementRequest";

import './Tasks.css';

function TasksPage() {
	const auth = useAuth();
	const userid = auth.user.data.id;

	const [todos, setTodos] = useState([]);
	const [value, setValue] = useState("");

	const { startCount, isSnackbarOpen, timesTaskChecked } = useAchievementCounter();

	const [snackbarAchievementOpen, setSnackbarAchievementOpen] = useState(false);
	const [achievementMessage, setAchievementMessage] = useState("");

	const [dialogOpen, setDialogOpen] = useState(false);
	const [taskIdToDelete, setTaskIdToDelete] = useState(null);

	setInterval(async () => {
		const body = await GetAllNewAchievementsForUser(userid);

		if (body.data.length === 0) {
			return;
		}
		const lastAchievementText = body.data[body.data.length - 1].content;

		setSnackbarAchievementOpen(true);
		setAchievementMessage(lastAchievementText);
	}, 3000)

	const handleDialogClose = () => {
		setDialogOpen(false);
	}

	const handleSnackbarClose = () => {
		setSnackbarAchievementOpen(false);
	};

	const onGetNewAchievements = () => {
		return (
			<Snackbar
				autoHideDuration={3000}
				open={snackbarAchievementOpen}
				onClose={handleSnackbarClose}
				message={achievementMessage}
			/>
		)
	};

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
		setValue("");
	}

	const deleteTask = async() => {
		handleDialogClose();
		await DeleteTask(taskIdToDelete);
		setTodos(todos.filter(x => x.id !== taskIdToDelete));
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
	};

	const renderDialog = () => {
		return (
			<Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Удалить задачу?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDialogClose}>Отмена</Button>
          <Button onClick={deleteTask} autoFocus>
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
		)
	};

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
					value={value}
					onChange = {(event) => {setValue(event.target.value)}}
				/>
				<Button className="inputButton" variant="contained" onClick={addTasks}>Add</Button>
			</Stack>
			<div className="taskForm">
				<Stack
					spacing={3}
					className="todoList"
					// divider={<Divider orientation="horizontal" color="secondary" flexItem />}
				>
					{
						todos.map((todo, todoIndex) => {
							return(
								<div  className="form" key={todoIndex}>
									<Stack justifyContent="space-between" direction="row" alignItems="center" spacing={3}>
										<Checkbox
											key={todo.id}
											checked={todo.done === 1}
											onChange={() => {
												onTaskChecked(todo)
											}}/>
										<TextField
											hiddenLabel
											multiline
											fullWidth
											variant="standard"
											defaultValue={todo.content}
											onBlur={(event) => onTaskContentChanged(todo, event)}
											InputProps={{ disableUnderline: true, color: todo.done ? "blue" : "black"	}}										
											style={{textDecoration: todo.done ? "line-through" : "none",	color: todo.done ? "darkblue": "black"											
											}}
										/>
										<Button color="secondary" onClick={() => {
											setDialogOpen(true);
											setTaskIdToDelete(todo.id);
										}}>
											<DeleteForeverIcon/>
										</Button>
									</Stack>
								</div>
							);
						})
					}
				</Stack>
				</div>
				{ renderDialog() }
				{ renderAchievement() }
				{ onGetNewAchievements([]) }
		</div>
	);
}
export default TasksPage;
