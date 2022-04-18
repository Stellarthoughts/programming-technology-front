import React, { useState } from 'react'

function AuthenticationPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)
	const [emailError, setEmailError] = useState('e-mail не может быть пустым')
	const [passwordError, setPasswordError] = useState('Пароль не может быть пустым')

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
	}
	return (
		<div className="App">
			<form>
				<h1>Sign up</h1>
				<input
					name='username'
					type='text'
					placeholder='Enter your username...'/>
					{(emailDirty && emailError) &&
						<div style={{color:'red'}}>
							(emailError)
						</div>
					}
				<input
					onBlur={e=>blurHandler(e)}
					name ='email'
					type='text'
					placeholder='Enter your email...'/>
					{(passwordDirty && passwordError) &&
					<div style={{color:'red'}}>
						(passwordError)
					</div>
					}
				<input
					onBlur={e=>blurHandler(e)}
					name='password'
					type='password'
					placeholder='Enter your password...'/>
				<input
					name='password2'
					type='password'
					placeholder='Repeat your password...'/>
				<button type='submit'>
					Sign up
				</button>
			</form>
    </div>
	);
}

export default AuthenticationPage;
