import { Graphics } from '@pixi/react';
import { forwardRef, useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Coordinate, useStore } from '../store/store.ts';
import { Draw, G, GraphicRef } from '../types/pixiTypes.ts';
import { parseCoordinates } from '../utils/canvas.ts';

interface BuildSnakeProps {
	snake: Coordinate[];
	g: G;
	dimensions: number; //the dimensions of the snake
}

const buildSnake = ({ snake, dimensions, g }: BuildSnakeProps) => {
	snake.forEach((coordinates) => {
		const parsedCoords = parseCoordinates({ coordinates, dimensions });
		const position = parsedCoords.x - dimensions;
		g.drawRect(position + dimensions, parsedCoords.y - dimensions, dimensions, dimensions);
	});
};

export const Snake = forwardRef<GraphicRef>((_, ref) => {
	const [snake, snakeSettings] = useStore(useShallow((state) => [state.snake, state.settings.snake]));

	const draw = useCallback<Draw>(
		(g) => {
			const { dimensions, width } = snakeSettings;
			g.clear();
			g.beginFill('grey');
			g.lineStyle(width, 'black', 1);
			g.moveTo(0, 0);
			buildSnake({ snake, g, dimensions });
		},
		[snake, snakeSettings]
	);

	return <Graphics ref={ref} draw={draw} />;
});
