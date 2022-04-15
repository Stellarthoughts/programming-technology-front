import React from 'react';
import './Tasks.css';
import { GetTasksForUser, CreateTask } from '../Requests/TaskRequest';
import { Checkbox } from '@mui/material/';
import { FormControlLabel } from '@mui/material';
import { FormGroup } from '@mui/material';
function TasksPage() {

	const userid = 1;

	React.useEffect(() => {
		getTasks();		
	});

	async function getTasks() {
		const body = await GetTasksForUser(userid);
		setTodos(body.data);
	}

	async function addTasks() {
		await CreateTask("hey","privet",userid);
	}

	const [todos, setTodos] = React.useState([]);
	const [checked, setChecked] = React.useState(false);

	React.useEffect(() => {
		console.log(checked);
	},[checked]);

	return (
		<div className='tasks'>
			<h1>Polina's production </h1>
				<input
			  	placeholder='Add a todo task'
          type="text"
          className="todo-input" 
        />
        <button type="submit" className="button-add" onClick={addTasks}>
          Add
        </button>
				<Checkbox checked={checked} onChange={(event) => setChecked(event.target.checked)}/>
				<div className='todolist'>
					<ul>
					{
						todos.map((x) => {
							return(
								<div key={x.id}>
									{/* <li>
										<input type="checkbox"/> {x.name}
									</li> */}
									<li>
									
									<FormGroup>
  									<FormControlLabel control={<Checkbox defaultChecked />} label="Label" />
										<FormControlLabel disabled control={<Checkbox />} label="Disabled" />
									</FormGroup>
																		
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