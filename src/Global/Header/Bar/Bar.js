import { Link } from "react-router-dom";
import { Typography, Stack, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import React from "react";
import "./Bar.css"

import CustomAvatar from "./Avatar/Avatar";

function Bar(props) {
	const theme = useTheme();
	const pathname = useLocation().pathname;
	const assignColor = (path) => pathname === path ? theme.palette.primary.dark : theme.palette.primary.main;
	const assignWeight = (path) => pathname === path ? "bold" : "regular";

	const textStyle = {
		tasks: {
			color: assignColor("/tasks"),
			weight: assignWeight("/tasks"),
		},
		achievements: {
			color: assignColor("/achievements"),
			weight: assignWeight("/achievements"),
		},
		login: {
			color: assignColor("/login"),
			weight: assignWeight("/login"),
		},
		signup: {
			color: assignColor("/signup"),
			weight: assignWeight("/signup"),
		}
	}

	function signed() {
		return (
			<Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
				<Link to="/tasks" style={{textDecoration: 'none'}}>
					<Typography sx={{fontWeight: textStyle.tasks.weight}} color={textStyle.tasks.color}>Tasks</Typography>
				</Link>
				<Link to="/achievements" style={{textDecoration: 'none'}}>
					<Typography sx={{fontWeight: textStyle.achievements.weight}}
											color={textStyle.achievements.color}>Achievements</Typography>
				</Link>
				<CustomAvatar />
			</Stack>
		);
	}

	function unsigned() {
		return(	
		<Stack spacing={4} direction="row" justifyContent="space-between" alignItems="center">
			
			<Link to="/login" style={{ textDecoration: 'none' }}>
				<Typography sx={{fontWeight: textStyle.login.weight}} color={textStyle.login.color}>Sign In</Typography>
			</Link>
			
			<Link to="/signup" style={{ textDecoration: 'none' }}>
				<Typography sx={{fontWeight: textStyle.signup.weight}} color={textStyle.signup.color}>Sign Up</Typography>
			</Link>
		</Stack>
		);
	}

	return (
		props.signed ? signed() : unsigned()
	);
}

export default Bar;
