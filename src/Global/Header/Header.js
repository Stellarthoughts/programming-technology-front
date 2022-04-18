import Logo from "./Logo/Logo";
import Bar from "./Bar/Bar";
import "./Header.css"
import { Grid } from "@mui/material";

function Header(props) {
	return (
		<div id="Header">
			<Grid container justify="center">
				<Logo pageName={props.signed}/>
				<Bar {...props}/>
			</Grid>
		</div>
	);
}

export default Header;