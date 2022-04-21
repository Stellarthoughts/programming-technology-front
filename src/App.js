import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import AchievementsPage from './Achievements/Achievements';
import TasksPage from './Tasks/Tasks';
import AuthenticationPage from './Authentication/Authentication';
import Header from './Global/Header/Header';
import './App.css';

export const routes = [
	{
		path: "/login",
		name: "Login",
		header: <Header signed={false}/>,
		main: <AuthenticationPage/>
	},
	{
		path: "/tasks",
		name: "Tasks",
		header: <Header signed={true}/>,
		main: <TasksPage/>
	},
	{
		path: "/achievements",
		name: "Achievements",
		header: <Header signed={true}/>,
		main: <AchievementsPage/>
	},
	{
		path: "/home",
		name: "Home",
		header: <EmptyHeader/>,
		main: <LinkBody route="/tasks" text="Привет!"/>
	},
	{
		path: "*",
		name: "404",
		header: <EmptyHeader/>,
		main: <LinkBody route="/tasks" text="Нет такой странички!"/>
	}
]

function EmptyHeader()
{
	return (
		<div></div>
	);
}

function LinkBody(props)
{
	return (
		<div><Link to={props.route}>{props.text}</Link></div>
	);
}

function App() {

  return (		
		<Router>
			<div className='main-div'>
				{/* Header */}
				<Routes>
					{routes.map((route,index) => (
						<Route 
							key = {index}
							path = {route.path}
							element = {route.header}
						/>
					))}
				</Routes>
				{/* Header */}
				<Routes>
					{routes.map((route,index) => (
						<Route 
							key = {index}
							path = {route.path}
							element = {route.main}
						/>
					))}
				</Routes>
			</div>
		</Router>
  );
}

export default App;
