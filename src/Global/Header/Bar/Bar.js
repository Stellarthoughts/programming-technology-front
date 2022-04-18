import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { Typography, Button } from "@mui/material";
import "./Bar.css"

function Bar(props) {
	return (
		props.signed ? 
		<div id="Bar">
			<Button>
				<Link to="/tasks">Tasks</Link>
			</Button>
			<Button>
				<Link to="/achievements">Achievements</Link>
			</Button>
			<Typography>Username</Typography>
			<Avatar alt="Username" sx={{ bgcolor: deepPurple[500] }}>US</Avatar>
		</div>
		:
		<div id="Bar">
			<Link to="/login">Log In</Link>
			<Link to="/signup">Sign Up</Link>
		</div>
	);
}

export default Bar;