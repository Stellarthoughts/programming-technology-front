import { useAuth } from "./use-auth";
import { useNavigate } from "react-router-dom";

function authStatus() {
	let auth = useAuth();
	let navigate = useNavigate();

	if (!auth.user) {
		return <p>You are not logged in.</p>
	}

}

export default authStatus();
