import { Box, Typography } from '@mui/material';
import { Stage } from '@pixi/react';
import { useCallback, useRef } from 'react';
import { Snake } from '../components';
import { Direction, flipDirection, useArrowKeys } from '../hooks';
import { useDetectCollision } from '../hooks/collisionDetection.ts';
import { setDirection, useStore } from '../store/store.ts';
import { ContainerRef, SpriteRef } from '../types/pixiTypes.ts';

export const GamePage = () => {
	const direction = useStore((state) => state.direction);
	const keyCallback = useCallback((current: Direction, newDirection: Direction) => {
		//ignore if already going in that direction
		if (current === newDirection) return;
		//cannot go back on self
		if (newDirection === flipDirection(current)) return;
		setDirection(newDirection);
	}, []);

	const snakeRef = useRef<SpriteRef>(null);
	const foodRef = useRef<ContainerRef>(null);

	useArrowKeys({ callback: keyCallback });

	useDetectCollision({ snake: snakeRef.current, food: foodRef.current });
	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100%',
				flexDirection: 'column',
				gap: 2
			}}
		>
			<Typography variant={'h3'}>{direction.toUpperCase()}</Typography>
			<Stage style={{ borderRadius: '4px' }} options={{ background: 'lightgrey' }} height={600} width={600}>
				<Snake ref={snakeRef} />
			</Stage>
		</Box>
	);
};
