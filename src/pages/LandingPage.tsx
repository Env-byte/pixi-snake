import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useShallow } from 'zustand/react/shallow';
import { pushSnakeSegment, setClickedPlay, useStore } from '../store/store.ts';
import { getCoordinates } from '../utils/canvas.ts';

export const LandingPage = () => {
	const [dimensions, canvas] = useStore(useShallow((state) => [state.settings.snake.dimensions, state.settings.canvas]));
	return (
		<Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
			<Card>
				<CardContent sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
					<Typography variant={'h3'} sx={{ fontFamily: 'Minecraft' }}>
						SNAKE
					</Typography>
					<Button
						onClick={() => {
							setClickedPlay(true);
							const coords = getCoordinates({
								coordinates: { x: canvas.width / 2, y: canvas.height / 2 },
								dimensions
							});
							pushSnakeSegment(coords);
						}}
						variant={'contained'}
					>
						Play
					</Button>
				</CardContent>
			</Card>
		</Box>
	);
};
