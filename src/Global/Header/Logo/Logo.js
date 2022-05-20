import React from 'react';
import { Stack, Typography, useTheme } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getRoute } from "../../../App";

function Logo(props) {
	const theme = useTheme();
	const loc = useLocation();
	const routeName = getRoute(loc.pathname).name;

	function signed(){
		return (
			<Stack spacing={2} direction="row" justifyContent="space-between" alignItems="flex-end">
					<Typography variant="h4" color={theme.palette.primary.main}>Logo</Typography>
					<Typography color={theme.palette.primary.main}>{routeName}</Typography>
			</Stack>
		);
	}

	function unsigned(){
		return (
			<Stack spacing={2} direction="row" justifyContent="space-between" alignItems="center">
					<Typography variant="h4" color={theme.palette.primary.main}>Logo</Typography>
			</Stack>
		);
	}

	return (
		props.signed ? signed() : unsigned()
	);
}

export default Logo;