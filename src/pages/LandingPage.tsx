import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import * as _ from 'lodash';
import { Point } from 'pixi.js';
import { useShallow } from 'zustand/react/shallow';
import { pushSnakeSegment, setClickedPlay, useStore } from '../store/store.ts';

export const LandingPage = () => {
	const [canvas, dimensions] = useStore(useShallow((state) => [state.settings.canvas, state.settings.snake.dimensions]));
	return (
		<Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
			<Card>
				<CardContent sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
					<Typography variant={'h3'} sx={{ fontFamily: 'Minecraft' }}>
						SNAKE
					</Typography>
					<Button
						onClick={() => {
							const startPos = new Point(canvas.width / 2, canvas.height / 2);
							setClickedPlay(true);
							pushSnakeSegment(startPos);
							_.times(5, (i) => {
								const x = i === 0 ? startPos.x - dimensions : startPos.x - dimensions * i;
								pushSnakeSegment(new Point(x, startPos.y));
							});
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
