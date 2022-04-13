import React from 'react';
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
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
				<button onClick={() => callBackendAPI()}>
					<p>{"Отправить инфу"}</p>
				</button>
        <p>{state.data.message}</p>
      </header>
    </div>
  );
}

export default App;
