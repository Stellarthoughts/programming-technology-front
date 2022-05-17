import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material'
import { GetAchievementsForUser } from '../Requests/AchievementRequest';
import { useAuth } from "../Authentication/use-auth";

function AchievementsPage() {
	const auth = useAuth();
	const userid = auth.user.data.id;

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
						<Grid item xs={6} key={index}>
							<Card>{AchievementCard(achievement)}</Card>
						</Grid>
					);
				})
			}
    </Grid>
	);
}

const AchievementCard = (data) => (
	<>
		<CardContent>
			<Typography variant="h5" component="div">
				{data.name}
			</Typography>
			<Typography variant="body2">
				{data.content}
			</Typography>
			<Typography variant="body2">
				{data.status ? "Выполнено!" : "Пока не сделано"}
			</Typography>
		</CardContent>
	</>
);

export default AchievementsPage;
