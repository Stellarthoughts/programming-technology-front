import { GenRequest } from "./Request";

/* Return fields: message, data */
export const GetAllUsers = async () => {
	const configInit = {
		method: "GET",
		headers: { 'Content-Type': 'application/json' }
	}
	const request = "/users"
	return await GenRequest(request, configInit);
}

/* Return fields: message, data */
export const GetAuthentication = async (login, password) => {
	const configInit = {
		method: "GET",
		headers: { 'Content-Type': 'application/json' }
	}
	const request = `/users/${login}&${password}`;
	return await GenRequest(request, configInit);
}

/* Return fields: message, data, id */
export const CreateUser = async (login, email, password) => {
	const data = {
		login: login,
		email: email,
		password: password
	}
	const configInit = {
		method: "POST",
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	}
	const request = `/users`;
	return await GenRequest(request, configInit);
}

/* Return fields: message, changes */
export const DeleteUser = async (id) => {
	const configInit = {
		method: "DELETE",
		headers: { 'Content-Type': 'application/json' }
	}
	const request = `/users/${id}`;
	return await GenRequest(request, configInit);
}