import React, { useState } from 'react';
import { TextField,Typography, Stack, Button,
	IconButton, InputAdornment, useTheme } from "@mui/material";
import { useAuth } from "./useAuth";
import "./style.css"
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { borderRadius, fontWeight } from '@mui/system';
import { Link } from "react-router-dom";

function AuthenticationPage() {
	const auth = useAuth();
	const navigate = useNavigate();
	const theme = useTheme();

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
			<div className="box">
			<Stack direction="column" className="container1"  spacing={2} alignItems = "center">
				<Typography fontSize={24} fontWeight={600} color={theme.palette.primary.main}>	Sign In</Typography>
				<TextField					
					id="standard-basic"
					label="Login"
					variant="standard" 
					fullWidth 			
					onChange={(event) => handleLoginOnChange(event)}
				/>				
				<TextField
					id="standard-basic-1"
					label="Password"
					variant="standard"
					fullWidth 
					type={showPassword ? 'text' : 'password'}
					onChange={(event) => handlePasswordOnChange(event)}
					helperText={errorText}
					error={error}
					InputProps={{
						endAdornment: showPasswordIcon()
					}}
				/>
			</Stack>
			</div>
			<div className='button'>
				<Button
					sx={{ 
						color: 'white',					 
						borderRadius: 5,
						marginTop: 5					
					}}
					className="log_but"
					variant="text"
					onClick={() => handleSignInResponse()}>					
					<Typography fontSize={15}>Sign In</Typography>					
				</Button>
			</div>			
			<div className='links'>
				<Typography sx={{fontStyle: 'italic'}} color={theme.palette.primary.dark}>Forgot Password</Typography>	
				<Link to="/signup" style={{ textDecoration: 'none' }}>
					<Typography sx={{fontStyle: 'italic'}} color={theme.palette.primary.main}>Dont have an account? Click here to Sign Up</Typography>
				</Link>
			</div>
		</div>
	);
}

export default AuthenticationPage;
