import React from 'react';
import './Tasks.css';
import { GetTasksForUser, CreateTask, DeleteTask } from '../Requests/TaskRequest';
import { Checkbox } from '@mui/material/';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function TasksPage() {

	const userid = 1;
	const [todos, setTodos] = React.useState([]);
	const [checked, setChecked] = React.useState(false);
	const [value, setValue] = React.useState([]);
	// const [input, setInput] = React.useState([]);

	React.useEffect(() => {
		console.log("GET");
		getTasks();		
	}, []);

	const getTasks = async () => {
		const body = await GetTasksForUser(userid);
		setTodos(body.data);
	}

	const addTasks = async () => {
		const body = await CreateTask("uwu", value, userid);
		setTodos(todos.concat(body.data));
	}

	const deleteTask = async(todoIndex) => {
		await DeleteTask(todoIndex);
		setTodos(todos.filter(x => x.id !== todoIndex));
	}


	return (
		<div className='tasks'>
			<input
				name ='todo-name'
			  placeholder='Add a todo task'
				type="text"
				className="todo-input" 
				value={value}
				onChange = {(event) => {setValue(event.target.value)}}
      />
		
      <button type="submit" className="button-add" onClick={addTasks}>Add</button>
				
				<div className='todolist'>
					<ul>
					{
						todos.map((todo, todoIndex) => {
							return(
								<div key={todoIndex}>
									<li className='task-li'>		
										<Checkbox key={todo.id} checked={checked} onChange={(event) => setChecked(event.target.checked)}/>
											{todo.content}{todo.id}
										
										<DeleteForeverIcon className='delete' onClick={() => deleteTask(todo.id)} />						
																		
									</li>
								</div>
							);
						})
					}
					</ul>
				</div>

	
		</div>
	);
}
export default TasksPage; 