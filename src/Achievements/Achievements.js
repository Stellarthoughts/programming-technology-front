import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardHeader, Grid, useTheme } from '@mui/material'
import { GetAchievementsForUser } from '../Requests/AchievementRequest';
import { useAuth } from "../Authentication/useAuth";
import "./style.css"

function AchievementsPage() {
	const auth = useAuth();
	const userid = auth.user.data.id;
	const theme = useTheme();

	const [achievements, setAchievements] = React.useState([]);

	React.useEffect(() => {
		getAchievements();
	}, []);

	const getAchievements = async () => {
		const body = await GetAchievementsForUser(userid);
		setAchievements(body.data);
	}

	return (
		<Grid container spacing={3}>
			{
				achievements.map((achievement, index) => {
					return (
						<Grid item xs={10} key={index}>
							<Card className='card'>{AchievementCard(achievement,theme)}</Card>
						</Grid>
					);
				})
			}
    </Grid>
	);
}

const AchievementCard = (data,theme) => (
	<>		
		<CardContent>
			<Typography variant="h6" fontWeight={600} color={theme.palette.primary.main} component="div">
				{data.name}
			</Typography>
			<Typography variant="body1" fontStyle={'italic'} fontWeight={400} marginTop={2} color={theme.palette.primary.dark}>
				{data.content}
			</Typography>
		</CardContent>
	</>
);

export default AchievementsPage;
