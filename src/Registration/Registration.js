import React, { useState } from 'react';
import { TextField, Stack, Button,
	IconButton, InputAdornment, FormHelperText } from "@mui/material";
import { useAuth } from "../Authentication/useAuth";
import "./style.css"
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function RegistrationPage() {
	const [login, setLogin] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirm, setPasswordConfirm] = useState('')

	const [showPassword, setShowPassword] = useState(false);
	const [errorText, setErrorText] = useState('')
	const [error, setError] = useState(false);

	const auth = useAuth();
	const navigate = useNavigate();

	const disableErrorIfEnabled = () => {
		if (error) {
			setError(false);
			setErrorText("");
		}
	}

	const enableError = (text) => {
		setError(true);
		setErrorText(text);
	}

	const handleLoginOnChange = (e) => {
		e.preventDefault();
		disableErrorIfEnabled();
		setLogin(e.target.value);
	};

	const handleEmailOnChange = (e) => {
		e.preventDefault();
		disableErrorIfEnabled();
		setEmail(e.target.value);
	};

	const handlePasswordOnChange = (e) => {
		e.preventDefault();
		disableErrorIfEnabled();
		setPassword(e.target.value);
	};

	const handlePasswordConfirmOnChange = (e) => {
		e.preventDefault();
		disableErrorIfEnabled();
		setPasswordConfirm(e.target.value);
	};

	const handleRegistrationResponse = async () => {
		if (login === "" || email === "" || password === "" || passwordConfirm === "") {
			enableError("One or more fields are empty.");
			return;
		}

		const emailRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(!emailRegular.test(email)) {
			enableError("Email is incorrect.");
			return;
		}

		if(password !== passwordConfirm) {
			enableError("Confirmation password is incorrect.")
			return;
		}

		const responseSignUp = await auth.signUp(login, email, password);

		if (responseSignUp === "failure") {
			enableError("Sign up failed.");
			return;
		}

		const responseSignIn = await auth.signIn(login, password);

		if (responseSignIn === "failure") {
			enableError("Sign in failed.");
			return;
		}

		navigate(`/tasks`, {replace: true});
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	function PasswordIcon() {
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
	
		<div className='box'>
		<Stack direction="column" className="container2" style={{width: "60%", margin: "auto"}}  spacing={2} alignItems="center">
		<h1 className='signUp'> Sign up </h1>
				<TextField
					type='text'
					label="Login"
					variant='outlined'
					className="StandardInput"
					fullWidth
					sx={{
						backgroundColor: "white",
						borderRadius: 1
				}}
					onChange={handleLoginOnChange}
				/>

				<TextField
					type='email'
					label="Email"
					className="StandardInput"
					variant='outlined'
					fullWidth
					sx={{
						backgroundColor: "white",
						borderRadius: 1
				}}
					onChange={handleEmailOnChange}
				/>

				<TextField
					label="Password"
					type={showPassword ? 'text' : 'password'}
					className="StandardInput"
					variant='outlined'
					fullWidth
					sx={{
						backgroundColor: "white",
						borderRadius: 1
					}}
			
					onChange={handlePasswordOnChange}
					InputProps={{
						
						endAdornment: PasswordIcon()
					}}
				/>

				<TextField
					label="Confirm Password"
					type={showPassword ? 'text' : 'password'}
					className="StandardInput"
					variant='outlined'
					fullWidth
					sx={{
							backgroundColor: "white",
							borderRadius: 1
					}}	
					helperText={errorText}
					error={error}
					onChange={handlePasswordConfirmOnChange}
				/>
				<Button 
					className='button_Registration'
					variant='text' 
					sx={{ 
						color: 'blue', 
						backgroundColor: "#ffffff",	
						fontSize: "15px", 
						borderRadius: 3
					}}
				  onClick={handleRegistrationResponse}>
			<h4 className='nameSignUp'>Sign up</h4>	
				</Button>
		</Stack>
		</div>
	);
}

export default RegistrationPage;
