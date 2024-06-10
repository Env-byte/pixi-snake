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
	width: number; //the dimensions of the snake
}

const buildSnake = ({ snake, dimensions, g, width }: BuildSnakeProps) => {
	g.clear();
	g.beginFill('grey');
	g.moveTo(0, 0);
	snake.forEach((coordinates, i) => {
		if (i !== 0) {
			g.lineStyle(width, 'yellow', 1);
		} else {
			g.lineStyle(width, 'red', 1);
		}
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
			buildSnake({ width, snake, g, dimensions });
		},
		[snake, snakeSettings]
	);
	return <Graphics ref={ref} draw={draw} />;
});
