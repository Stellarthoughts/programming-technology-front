import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Typography, Grid } from "@mui/material";
import React from "react";
import "./Bar.css"

function Bar(props) {
	function signed() {
		return(
		<Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
			<Grid item>
				<Typography color="textSecondary">
					<Link to="/tasks" style={{ textDecoration: 'none' }}>Tasks</Link>
				</Typography>
			</Grid>
			<Grid item>
				<Typography>
					<Link to="/achievements" style={{ textDecoration: 'none' }}>Achievements</Link>
				</Typography	>
			</Grid>
			<Grid item>
				<Typography>Username</Typography>
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
				<Link to="/login" style={{ textDecoration: 'none' }}>Log In</Link>
			</Grid>
			<Grid item>
				<Link to="/signup" style={{ textDecoration: 'none' }}>Sign Up</Link>
			</Grid>
		</Grid>
		);
	}

	return (
		props.signed ? signed() : unsigned()
	);
}

export default Bar;