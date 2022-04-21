import React, { useState, useEffect, useContext, createContext } from "react";
import { GetAuthentication, CreateUser } from "./Requests/UserRequest"

const authContext = createContext();

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
	const [user, setUser] = useState(null);

	const signIn = (login, password) => {
		return GetAuthentication(login, password)
			.then((response) => {
				setUser(response.data);
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
		signOut,
	}
}