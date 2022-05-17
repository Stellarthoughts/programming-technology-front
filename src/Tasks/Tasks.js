import React, { useEffect, useState } from 'react';
import './Tasks.css';
import { GetTasksForUser, CreateTask, DeleteTask, UpdateTask } from '../Requests/TaskRequest';
import { Checkbox, TextField, Stack, Button, Divider, Typography } from '@mui/material/';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useAuth } from "../Authentication/use-auth";

function TasksPage() {
	const auth = useAuth();
	const userid = auth.user.data.id;

	const [todos, setTodos] = useState([]);
	const [value, setValue] = useState("");
	// const [input, setInput] = React.useState([]);

	useEffect(() => {
		getTasks();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const getTasks = async () => {
		const body = await GetTasksForUser(userid);
		setTodos(body.data);
	}

	const addTasks = async () => {
		if(value === "")
		{
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

	// const completeTask = todos.findIndex( (todoIndex) => { if (todo.id === id)
  //     return todo;}
	// );
  // const completeTodo = id => {
  //   let updatedTodos = todos.map(todo => {
  //     if (todo.id === id) {
  //       todo.isComplete = !todo.isComplete;
  //     }
  //     return todo;
  //   });
  //   setTodos(updatedTodos);
  // };
	const setTaskChecked = (task) => {
		setTodos(prev => prev.map(x => {
			if(x.id === task.id)
			{
				x.done = x.done === 1 ? 0 : 1;
			}
			return x;
		}));
		updateTask(task);
	}

	const updateTask = async(task) => {
		await UpdateTask(task.id,task.content,task.done,task.userid);
	}

	return (
		<div className='tasks'>
			<Stack className="input" direction="row" alignItems="stretch" justifyContent="center">
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
					spacing={2}
					className="todoList"
					divider={<Divider orientation="horizontal" color="secondary" flexItem />}
				>
					{
						todos.map((todo, todoIndex) => {
							return(
								<div key={todoIndex}>
										<Stack justifyContent="space-between" direction="row" alignItems="center">
											<Stack justifyContent="flex-start" direction="row" alignItems="center">
											<Checkbox key={todo.id} checked={todo.done === 1 ? true : false} onChange={() => {setTaskChecked(todo)}}/>
											<Typography color="textPrimary">{todo.content}</Typography>
											</Stack>
											<Button color="secondary" onClick={() => deleteTask(todo.id)}>
												<DeleteForeverIcon/>
											</Button>
										</Stack>
								</div>
							);
						})
					}
				</Stack>


		</div>
	);
}
export default TasksPage;
