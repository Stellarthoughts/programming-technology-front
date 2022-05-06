import React from 'react';
import { ProvideAuth } from "./Authentication/use-auth.js"
import RequireAuth from "./Authentication/RequireAuth";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AchievementsPage from './Achievements/Achievements';
import TasksPage from './Tasks/Tasks';
import AuthenticationPage from './Authentication/Authentication';
import Header from './Global/Header/Header';
import './App.css';

export function getRoute(path)
{
	return routes.find(x => x.path === path);
}

const routes = [
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
		main: <RequireAuth><TasksPage/></RequireAuth>
	},
	{
		path: "/achievements",
		name: "Achievements",
		header: <Header signed={true}/>,
		main: <RequireAuth><TasksPage/></RequireAuth>
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
		<ProvideAuth>
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
					{/* Body */}
					<div className='body-element'>
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
				</div>
			</Router>
		</ProvideAuth>
  );
}

export default App;
