import React, { useState } from 'react';
import { TextField, Stack, Button,
	IconButton, InputAdornment } from "@mui/material";
import { useAuth } from "./useAuth";
import "./style.css"
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { borderRadius, fontWeight } from '@mui/system';

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
			setErrorText("One or more fields are empty.");
			return;
		}

		const response = await auth.signIn(login, password);
		if (response === "failure") {
			setError(true);
			setErrorText("Incorrect login or password.");
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
					{showPassword ? <Visibility /> : <VisibilityOff />}
				</IconButton>
			</InputAdornment>
		)
	};


	return (
		<div>
			<div 
				className='welcome_text'
				>WELCOME to Logo
			</div>
			<div className="box1">
			<Stack direction="column" className="container1"  spacing={2} alignItems = "center">
				<h2 
					className="login_text">
				Login
				</h2>

				<TextField
					sx = {{
					backgroundColor: "white",
					borderRadius: 1
					}}
					id="standard-basic"
					label="Login"
					variant="outlined"
					borderRadius = "30"
					fullWidth 			
					onChange={(event) => handleLoginOnChange(event)}
				/>
				
				<TextField
					sx = {{
						backgroundColor: "white",
						borderRadius: 1
					}}
					id="standard-basic"
					label="Password"
					variant="outlined"
					fullWidth 
					type={showPassword ? 'text' : 'password'}
					onChange={(event) => handlePasswordOnChange(event)}
					helperText={errorText}
					error={error}
					InputProps={{
						endAdornment: showPasswordIcon()
					}}
				/>
			
				<Button
					sx={{ 
						color: 'blue', 
						backgroundColor: "#ffffff",	
						fontSize: "15px", 
						borderRadius: 3,
						marginTop: 10
						
					}}
					className="log_but"
					variant="text"
					onClick={() => handleSignInResponse()}>
					<h4 
						className ="button_text" 
						color='black'>
					Log In
					</h4>
				</Button>
			</Stack>
			</div>
		</div>
	);
}

export default AuthenticationPage;
