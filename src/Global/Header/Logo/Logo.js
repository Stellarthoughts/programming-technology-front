import { Stack, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { getRoute } from "../../../App";

function Logo(props) {
	const loc = useLocation();
	const routeName = getRoute(loc.pathname).name;

	function signed(){
		return (
			<Stack container spacing={2} direction="row" justifyContent="space-between" alignItems="flex-end">
					<Typography variant="h4">Logo</Typography>
					<Typography>{routeName}</Typography>
			</Stack>
		);
	}

	function unsigned(){
		return (
			<Stack container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
					<Typography>Logo</Typography>
			</Stack>
		);
	}

	return (
		props.signed ? signed() : unsigned()
	);
}

export default Logo;