import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import AchievementsPage from './Achievements/Achievements';
import TasksPage from './Tasks/Tasks';
import AuthenticationPage from './Authentication/Authentication';
import logo from './logo.svg';
import './App.css';

function App() {
	const [state, setState] = React.useState({
		data: 'nothing so far'
	});

	// ComponentDidMount
	// React.useEffect(() => {
	// 	callBackendAPI()
  //     .then(res => setState({ data: res.express }))
  //     .catch(err => console.log(err));
	// }, []);

	const callBackendAPI = async () => {
		const login = 'hey Jude'
		const email = '12345@test'
		const password = '12345678'

		const dataPost = {
			login: login,
			email: email,
			password: password
		}

		const configInit = {
			method: "POST",
			body: JSON.stringify(dataPost),
			headers: { 'Content-Type': 'application/json' }
		}
		const request = "/users"

    const response = await fetch(request, configInit);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message)
    }

		setState({data: body})
    return body;
  };

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
