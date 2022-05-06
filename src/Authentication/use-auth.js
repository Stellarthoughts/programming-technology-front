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

	const signIn = async (login, password) => {
		const response = await GetAuthentication(login, password);

		const userId = { id: response.data.id };
		setUser(userId);

		return response.message;
	};

	const signUp = async (login, email, password) => {
		const response = await CreateUser(login, email, password);

		const userId = { id: response.data.id };
		setUser(userId);

		return response.message;
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
