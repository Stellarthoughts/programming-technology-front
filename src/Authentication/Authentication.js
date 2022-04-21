import React, { useState } from 'react';
import { TextField, Stack, Button } from "@mui/material";
import { useAuth } from "../use-auth";
import "./style.css"

function AuthenticationPage() {
	const auth = useAuth();
	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const [errorText, setErrorText] = useState("");

	const handleLoginOnBlur = (newLogin) => {
		setLogin(newLogin);
	};

	const handlePasswordOnBlur = (newPassword) => {
		setPassword(newPassword);
	};

	const handleSignInResponse = () => {
		auth.signIn(login, password)
			.then((message) => {
				if (message === "failure") {
					setError(true);
					setErrorText("Неправильное имя пользователя или пароль.")
				}
			})
	};

	return (
		<>
			<div>Auth</div>
			<Stack direction="column" className="container" spacing={2}>
				<TextField
					id="standard-basic"
					label="Login"
					variant="standard"
					onChange={(event) => handleLoginOnBlur(event.target.value)}
				/>
				<TextField
					id="standard-basic"
					label="Password"
					variant="standard"
					onChange={(event) => handlePasswordOnBlur(event.target.value)}
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
