import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import AchievementsPage from './Achievements/Achievements';
import TasksPage from './Tasks/Tasks';
import AuthenticationPage from './Authentication/Authentication';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Auth</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to="/achievements">Achievements</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<AuthenticationPage/>}/>
          <Route path="/tasks" element={<TasksPage/>}/>
          <Route path="/achievements" element={<AchievementsPage/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
