import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./use-auth";

const RequireAuth = ({ children }) => {
	let auth = useAuth();
	let location = useLocation();

	if (!auth.user) {
		return <Navigate to="/login" state={{ from: location }} replace />
	}

	return children;
};

export default RequireAuth;
