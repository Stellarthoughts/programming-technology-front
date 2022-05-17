import React, { useState } from 'react'
import { TextField, Button, Stack } from "@mui/material";

function RegistrationPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)
	const [emailError, setEmailError] = useState("e-mail can't be empty")
	const [passwordError, setPasswordError] = useState("password can't be empty")

	const blurHandler = (e) => {
		switch (e.target.name) {
			case 'email':
				setEmailDirty(true)
				break
			case 'password':
				setPasswordDirty(true)
				break
			default:
				break
		}
	};

	return (
		<form>
			<Stack direction="column" className="App" style={{width: "60%", margin: "auto"}}  spacing={2}>
			<h1>Sign up</h1>
				<TextField
					name='username'
					type='text'
					placeholder='Enter your username...'
					variant="standard"
					className="StandardInput"
			/>
				{(emailDirty && emailError) &&
					<div style={{color:'red'}}>
						(emailError)
					</div>
				}

				<TextField
					onBlur={e=>blurHandler(e)}
					name ='email'
					type='text'
					className="StandardInput"
					variant='standard'
					placeholder='Enter your email...'
				/>
				
				{(passwordDirty && passwordError) &&
				<div style={{color:'red'}}>
					(passwordError)
				</div>
				}

				<TextField
					onBlur={e=>blurHandler(e)}
					name='password'
					type='password'
					className="StandardInput"
					variant='standard'
					placeholder='Enter your password...'/>
				<TextField
					name='password2'
					type='password'
					className="StandardInput"
					variant='standard'
					placeholder='Repeat your password...'/>
				<Button type='text'>
				Sign up
				</Button>
			</Stack>
		</form>
	);
}

export default RegistrationPage;
