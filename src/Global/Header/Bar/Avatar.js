import {Avatar, Button, Popover, Stack, Typography} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React, { useState } from "react";
import { useAuth } from "../../../Authentication/use-auth";
import { useNavigate } from "react-router-dom";
import "./avatar.css";

const CustomAvatar = () => {
	const auth = useAuth();
	const navigate = useNavigate();
	let username = auth.user ? auth.user.data.login : "Default";

	const [anchorEl, setAnchorEl] = useState(null);

	const handlerClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlerClose = () => {
		setAnchorEl(null);
	};

	const handlerSignOut = () => {
		auth.signOut();

		navigate(`/login`, {replace: true})
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<>
			<Button onClick={handlerClick}>
				<Avatar alt="Username" sx={{bgcolor: deepPurple[500]}}>{username.slice(0, 2).toUpperCase()}</Avatar>
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handlerClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<Typography sx={{ p: 2 }}>Hello {username}!</Typography>
				<Button
					variant="text"
					onClick={handlerSignOut}
					fullWidth={true}
				>
					Выйти
				</Button>
			</Popover>
		</>
	);
}

export default CustomAvatar;
