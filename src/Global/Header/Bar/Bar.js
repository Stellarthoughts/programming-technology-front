import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Typography, Button, Grid } from "@mui/material";
import "./Bar.css"

function Bar(props) {
	function signed() {
		return(
		<Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
			<Grid item>
				<Typography>
					<Link to="/tasks">Tasks</Link>
				</Typography>
			</Grid>
			<Grid item>
				<Typography>
					<Link to="/achievements">Achievements</Link>
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
				<Link to="/login">Log In</Link>
			</Grid>
			<Grid item>
				<Link to="/signup">Sign Up</Link>
			</Grid>
		</Grid>
		);
	}

	return (
		props.signed ? signed() : unsigned()
	);
}

export default Bar;