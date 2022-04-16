import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import AchievementsPage from './Achievements/Achievements';
import TasksPage from './Tasks/Tasks';
import AuthenticationPage from './Authentication/Authentication';
import Header from './Global/Header/Header';
import './App.css';

const routes = [
	{
		path: "/login",
		header: <Header signed={false}/>,
		main: <AuthenticationPage/>
	},
	{
		path: "/tasks",
		header: <Header signed={true}/>,
		main: <TasksPage/>
	},
	{
		path: "/achievements",
		header: <Header signed={true}/>,
		main: <AchievementsPage/>
	},
]

function App() {
  return (
    <Router>
      <div>
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
