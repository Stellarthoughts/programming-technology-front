import React from 'react';
import Logo from "./Logo/Logo";
import Bar from "./Bar/Bar";
import "./Header.css"
import { Grid } from "@mui/material";

function Header(props) {
	return (
		<div id="Header">
			<Grid container spacing={2} justifyContent="space-between" alignItems="baseline">
				<Grid item>
					<Logo {...props}/>
				</Grid>
				<Grid item>
					<Bar {...props}/>
				</Grid>
			</Grid>
		</div>
	);
}

export default Header;