import React, { useState } from 'react';
import { TextField,Typography, Stack, Button,
	IconButton, InputAdornment, useTheme, FormHelperText } from "@mui/material";
import { useAuth } from "../Authentication/useAuth";
import "./style.css"
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link } from "react-router-dom";

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
	const theme = useTheme();

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
		<div>
			<div className='box'>
			<Stack direction="column" className="container1"  spacing={2} alignItems="center">
			<Typography fontSize={24} fontWeight={600} color={theme.palette.primary.main}>	Sign Up</Typography>
				<TextField
					type='text'
					label="Login"
					variant='standard'
					className="StandardInput"
					fullWidth				
					onChange={handleLoginOnChange}
				/>
				<TextField
					type='email'
					label="Email"
					className="StandardInput"
					variant='standard'
					fullWidth
					onChange={handleEmailOnChange}
				/>
				<TextField
					label="Password"
					type={showPassword ? 'text' : 'password'}
					className="StandardInput"
					variant='standard'
					fullWidth
					onChange={handlePasswordOnChange}
					InputProps={{
						
						endAdornment: PasswordIcon()
					}}
				/>
				<TextField
					label="Confirm Password"
					type={showPassword ? 'text' : 'password'}
					className="StandardInput"
					variant='standard'
					fullWidth
					helperText={errorText}
					error={error}
					onChange={handlePasswordConfirmOnChange}
				/>
			</Stack>
			</div>
			<div className='button'>
			<Button 
				className='button_Registration'
				variant='text' 
				sx={{ 
					color: 'white', 
					borderRadius: 5,
					marginTop: 5,		
				}}
				onClick={handleRegistrationResponse}>
				<Typography fontSize={15} >Sign Up</Typography>		
			</Button>
			</div>
			<div className='links'>
				<Link to="/login" style={{ textDecoration: 'none' }}>
					<Typography sx={{fontStyle: 'italic'}} color={theme.palette.primary.main}>Already have an account? Click here to Sign In</Typography>
				</Link>
			</div>
	</div>
	);
}

export default RegistrationPage;
