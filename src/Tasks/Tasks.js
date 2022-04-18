import React from 'react';
import './Tasks.css';
import { GetTasksForUser, CreateTask, DeleteTask } from '../Requests/TaskRequest';
import { Checkbox } from '@mui/material/';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function TasksPage() {

	const userid = 1;
	const [todos, setTodos] = React.useState([]);
	const [checked, setChecked] = React.useState(false);
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
		const body = await CreateTask("hey","privet",userid);
		setTodos(todos.concat(body.data));
	}

	const deleteTask = async(todoIndex) => {
		await DeleteTask(todoIndex);
		setTodos(todos.filter(x => x.id !== todoIndex));
	}

	return (
		<div className='tasks'>
				<input
			  	placeholder='Add a todo task'
          type="text"
          className="todo-input" 
        />
        <button type="submit" className="button-add" onClick={addTasks}>Add</button>
				
				<div className='todolist'>
					<ul>
					{
						todos.map((todos, todoIndex) => {
							return(
								<div key={todoIndex}>
									<li className='task-li'>		
										<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)}/>
											{todos.name}{todos.id}
										<DeleteForeverIcon className='delete' onClick={() => deleteTask(todos.id)} />						
																		
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