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

	const handleLoginOnChange = (event) => {
		event.preventDefault();
		if (error) {
			setError(false);
			setErrorText("");
		}

		const login = event.target.value;
		setLogin(login);
	};

	const handlePasswordOnChange = (event) => {
		event.preventDefault();
		if (error) {
			setError(false);
			setErrorText("");
		}

		const password = event.target.value;
		setPassword(password);
	};

	const handleSignInResponse = async () => {
		if (login === "" || password === "") {
			setError(true);
			setErrorText("Одно или несколько полей пусты.");
			return;
		}

		const response = await auth.signIn(login, password);
		if (response === "failure") {
			setError(true);
			setErrorText("Неправильное имя пользователя или пароль.");
			return;
		}

		navigate(`/tasks`, {replace: true});
	};

	return (
		<>
			<div>Auth</div>
			<Stack direction="column" className="container" spacing={2}>
				<TextField
					id="standard-basic"
					label="Login"
					variant="standard"
					onChange={(event) => handleLoginOnChange(event)}
				/>
				<TextField
					id="standard-basic"
					label="Password"
					variant="standard"
					onChange={(event) => handlePasswordOnChange(event)}
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
