import { Grid, Typography } from "@mui/material";

function Logo(props) {

	function signed(){
		return (
			<Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="flex-end">
				<Grid item>
					<Typography variant="h4">Logo</Typography>
				</Grid>
				<Grid item>
					<Typography>Page Name</Typography>
				</Grid>
			</Grid>
		);
	}

	function unsigned(){
		return (
			<Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="center">
				<Grid item>
					<Typography>Logo</Typography>
				</Grid>
			</Grid>
		);
	}

	return (
		props.signed ? signed() : unsigned()
	);
}

export default Logo;