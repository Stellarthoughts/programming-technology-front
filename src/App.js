import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
	const [state, setState] = React.useState({
		data: null
	});

	React.useEffect(() => {
		componentDidMount();
	}, []);

	function componentDidMount() {
    callBackendAPI()
      .then(res => setState({ data: res.express }))
      .catch(err => console.log(err));
  }

	const callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
				<p>
					{state.data}
				</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
