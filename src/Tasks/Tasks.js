
import React from 'react';
import './Tasks.css';
function TasksPage() {

	const list = [
		{
			id: 1,
			name: "name1",
			content: "ddd0",
		},
		{
			id: 1,
			name: "name2",
			content: "ddd0",
		}
	]

	return (
		<div className='tasks'>
			<h1>Polina's production </h1>
				<input
			  	placeholder='Add a todo task'
          type="text"
          className="todo-input" 
        />
        <button type="submit" className="button-add" >
          Add
        </button>

				<div className='todolist'>
					<ul>
					{
						list.map((x) => {
							return(
								<div>
									<li>
										<input type="checkbox" className="custom-checkbox" value={x.name}/>
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