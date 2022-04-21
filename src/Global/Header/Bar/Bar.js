import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Typography, Grid } from "@mui/material";
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
		<Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
			<Grid item>
			<Link to="/tasks" style={{ textDecoration: 'none' }}>
				<Typography color={textColor.tasks}>Tasks</Typography>
			</Link>
			</Grid>
			<Grid item>
			<Link to="/achievements" style={{ textDecoration: 'none' }}>
				<Typography color={textColor.achievements}>Achievements</Typography>
			</Link>	
			</Grid>
			<Grid item>
				<Typography color="primary">Username</Typography>
			</Grid>
			<Grid item>
				<Avatar alt="Username" sx={{ bgcolor: deepPurple[500] }}>US</Avatar>
			</Grid>
		</Grid>
		);
	}

	function unsigned() {
		return(
		<Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
			<Grid item>
				<Link to="/login" style={{ textDecoration: 'none' }}>
					<Typography color={textColor.login}>Log In</Typography>
				</Link>
			</Grid>
			<Grid item>
				<Link to="/signup" style={{ textDecoration: 'none' }}>
					<Typography color={textColor.signup}>Sign Up</Typography>
				</Link>
			</Grid>
		</Grid>
		);
	}

	return (
		props.signed ? signed() : unsigned()
	);
}

export default Bar;