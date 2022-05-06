import React, {createContext, useContext, useState} from "react";
import {CreateUser, GetAuthentication} from "../Requests/UserRequest"

const authContext = createContext(null);

export function ProvideAuth({ children }) {
	const auth = useProvideAuth();
	return (
		<authContext.Provider value={auth}>
			{children}
		</authContext.Provider>
	);
}

export const useAuth = () => {
	return useContext(authContext);
};

function useProvideAuth() {
	const [user, setUser] = useState({id: 2});

	const signIn = (login, password) => {
		return GetAuthentication(login, password)
			.then((response) => {
				console.log(user)
				setUser((prevState) => {response.data.id})
				console.log({id: response.data.id})
				console.log(user)
				return response.message;
			});
	};

	const signUp = (login, email, password) => {
		return CreateUser(login, email, password)
			.then((response) => {
				setUser(response.data);
				return response.data;
			});
	};

	const signOut = () => {
		setUser(null);
	};

	return {
		user,
		signIn,
		signUp,
		signOut
	};
}
