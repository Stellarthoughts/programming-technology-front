import { GenRequest } from "./Request";

/* Return fields: message, data */
export const GetAllTasks = async () => {
	const configInit = {
		method: "GET",
		headers: { 'Content-Type': 'application/json' }
	}
	const request = "/tasks"
	return await GenRequest(request, configInit);
}

/* Return fields: message, data */
export const GetTasksForUser = async (id) => {
	const configInit = {
		method: "GET",
		headers: { 'Content-Type': 'application/json' }
	}
	const request = `/tasks/${id}`;
	return await GenRequest(request, configInit);
}

/* Return fields: message, data, id */
export const CreateTask = async (content, done, userid) => {
	const data = {
		content: content,
		done: done,
		userid: userid
	}
	const configInit = {
		method: "POST",
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	}
	const request = `/tasks`;
	return await GenRequest(request, configInit);
}

/* Return fields: message, data */
export const UpdateTask = async (id, content, done, userid) => {
	const data = {
		id: id,
		done: done,
		content: content,
		userid: userid
	}
	const configInit = {
		method: "PUT",
		body: JSON.stringify(data),
		headers: { 'Content-Type': 'application/json' }
	}
	const request = '/tasks';
	return await GenRequest(request, configInit);
}

/* Return fields: message, changes */
export const DeleteTask = async (id) => {
	const configInit = {
		method: "DELETE",
		headers: { 'Content-Type': 'application/json' }
	}
	const request = `/tasks/${id}`;
	return await GenRequest(request, configInit);
}