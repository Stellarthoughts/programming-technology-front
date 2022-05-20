import { GenRequest } from "./Request";

/* Return fields: message, data */
export const GetAllAchievements = async () => {
	const configInit = {
		method: "GET",
		headers: { 'Content-Type': 'application/json' }
	}
	const request = "/achievements"
	return await GenRequest(request, configInit);
}

/* Return fields: message, data */
export const GetAchievementsForUser = async (id) => {
	const configInit = {
		method: "GET",
		headers: { 'Content-Type': 'application/json' }
	}
	const request = `/achievements/${id}`;
	return await GenRequest(request, configInit);
}

/* Return fields: message, data */
export const GetAllNewAchievementsForUser = async (id) => {
	const configInit = {
		method: "GET",
		headers: { 'Content-Type': 'application/json' }
	}
	const request = `/achievements/new/${id}`;
	return await GenRequest(request, configInit);
}

/* Return fields: message, data, id */
export const CreateAchievement = async (content, done, userid) => {
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
	const request = `/achievements`;
	return await GenRequest(request, configInit);
}

/* Return fields: message, data */
export const UpdateAchievement = async (id, content, done, userid) => {
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
	const request = '/achievements';
	return await GenRequest(request, configInit);
}

/* Return fields: message, changes */
export const DeleteAchievement = async (id) => {
	const configInit = {
		method: "DELETE",
		headers: { 'Content-Type': 'application/json' }
	}
	const request = `/achievements/${id}`;
	return await GenRequest(request, configInit);
}
