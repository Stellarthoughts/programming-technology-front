import React, { useState } from 'react';
import { TextField, Stack, Button } from "@mui/material";
import { useAuth } from "./use-auth";
import "./style.css"
import { useNavigate } from "react-router-dom";

function AuthenticationPage() {
	const auth = useAuth();
	const navigate = useNavigate();

	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const [errorText, setErrorText] = useState("");

	const handleLoginOnBlur = (event) => {
		event.preventDefault();
		const login = event.target.value;
		setLogin(login);
	};

	const handlePasswordOnBlur = (event) => {
		event.preventDefault();
		const password = event.target.value;
		setPassword(password);
	};

	const handleSignInResponse = () => {
		auth.signIn(login, password)
			.then((message) => {
				if (message === "failure") {
					setError(true);
					setErrorText("Неправильное имя пользователя или пароль.")
				}
			});

		// navigate(`/tasks${userId}`, {replace: true});
	};

	return (
		<>
			<div>Auth</div>
			<Stack direction="column" className="container" spacing={2}>
				<TextField
					id="standard-basic"
					label="Login"
					variant="standard"
					onChange={(event) => handleLoginOnBlur(event)}
				/>
				<TextField
					id="standard-basic"
					label="Password"
					variant="standard"
					onChange={(event) => handlePasswordOnBlur(event)}
					helperText={errorText}
					error={error}
				/>
				<Button
					variant="text"
					onClick={() => handleSignInResponse()}>
					Войти
				</Button>
			</Stack>
		</>
	);
}

export default AuthenticationPage;
