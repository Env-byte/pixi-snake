import { Box } from '@mui/material';
import { Stage } from '@pixi/react';
import { useCallback, useRef } from 'react';
import { Snake } from '../components';
import { FoodSpawner } from '../components/FoodSpawner.tsx';
import { Direction, useArrowKeys } from '../hooks';
import { useDetectCollision } from '../hooks/collisionDetection.ts';
import { setDirection, setSnake, useStore } from '../store/store.ts';
import { ContainerRef, GraphicRef } from '../types/pixiTypes.ts';
import { moveSnake } from '../utils/canvas.ts';

export const GamePage = () => {
	const snake = useStore((s) => s.snake);
	const keyCallback = useCallback(
		(direction: Direction) => {
			setSnake(moveSnake({ snake, direction }));
			setDirection(direction);
		},
		[snake]
	);

	const snakeRef = useRef<GraphicRef>(null);
	const foodRef = useRef<ContainerRef>(null);

	useArrowKeys({ callback: keyCallback });

	useDetectCollision({ snake: snakeRef.current, food: foodRef.current });
	return (
		<Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
			<Stage style={{ borderRadius: '4px' }} options={{ background: 'lightgrey' }} height={600} width={600}>
				<Snake ref={snakeRef} />
				<FoodSpawner ref={foodRef} />
			</Stage>
		</Box>
	);
};
