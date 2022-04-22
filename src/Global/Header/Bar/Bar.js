import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Typography, Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import React from "react";
import "./Bar.css"

function Bar(props) {
	const pathname = useLocation().pathname;
	const assignColor = (path) => pathname === path ? "secondary" : "primary"

	const textColor = {
		tasks: assignColor("/tasks"),
		achievements: assignColor("/achievements"),
		login: assignColor("/login"),
		signup: assignColor("/signup")
	}

	function signed() {
		return(
		<Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
			<Link to="/tasks" style={{ textDecoration: 'none' }}>
				<Typography color={textColor.tasks}>Tasks</Typography>
			</Link>
			<Link to="/achievements" style={{ textDecoration: 'none' }}>
				<Typography color={textColor.achievements}>Achievements</Typography>
			</Link>	
				<Typography color="primary">Username</Typography>
				<Avatar alt="Username" sx={{ bgcolor: deepPurple[500] }}>US</Avatar>
		</Stack>
		);
	}

	function unsigned() {
		return(
		<Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
				<Link to="/login" style={{ textDecoration: 'none' }}>
					<Typography color={textColor.login}>Log In</Typography>
				</Link>
				<Link to="/signup" style={{ textDecoration: 'none' }}>
					<Typography color={textColor.signup}>Sign Up</Typography>
				</Link>
		</Stack>
		);
	}

	return (
		props.signed ? signed() : unsigned()
	);
}

export default Bar;