import React, { useState } from 'react';
import { TextField, Stack, Button,
	IconButton, InputAdornment } from "@mui/material";
import { useAuth } from "./use-auth";
import "./style.css"
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function AuthenticationPage() {
	const auth = useAuth();
	const navigate = useNavigate();

	const [login, setLogin] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
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

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const showPasswordIcon = () => {
		return (
			<InputAdornment position="end">
				<IconButton
					aria-label="toggle password visibility"
					onClick={handleClickShowPassword}
				>
					{showPassword ? <VisibilityOff /> : <Visibility />}
				</IconButton>
			</InputAdornment>
		)
	};

	return (
		<Stack direction="column" className="container" spacing={5}>
			<div style={{textAlign: 'center'}}>Auth</div>
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
				type={showPassword ? 'text' : 'password'}
				onChange={(event) => handlePasswordOnChange(event)}
				helperText={errorText}
				error={error}
				InputProps={{
					endAdornment: showPasswordIcon()
				}}
			/>
			<Button
				variant="text"
				onClick={() => handleSignInResponse()}>
				Войти
			</Button>
		</Stack>
	);
}

export default AuthenticationPage;
