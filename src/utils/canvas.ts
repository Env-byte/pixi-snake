import { Direction } from '../hooks';
import { CanvasSettings, Coordinate } from '../store/store.ts';

interface DivideCanvasProps {
	canvas: CanvasSettings;
	dimensions: number;
}

export const divideCanvas = ({ canvas, dimensions }: DivideCanvasProps) => {
	return {
		rows: Number(canvas.height / dimensions),
		columns: Number(canvas.width / dimensions)
	};
};

interface ParseCoordinatesProps {
	coordinates: Coordinate;
	dimensions: number;
}

/**
 * Parse the coordinates to 20,40,60 instead of 1,2,3
 * @param coordinates
 * @param dimensions
 */
export const parseCoordinates = ({ coordinates, dimensions }: ParseCoordinatesProps) => {
	return { x: coordinates.x * dimensions, y: coordinates.y * dimensions };
};

interface GetCoordinatesProps {
	coordinates: Coordinate;
	dimensions: number;
}

/**
 * Get the coordinates as 1,2,3 instead of 20,40,60
 * @param x
 * @param y
 * @param dimensions
 */
export const getCoordinates = ({ coordinates: { x, y }, dimensions }: GetCoordinatesProps) => {
	return { x: x / dimensions, y: y / dimensions };
};

interface MoveSnakeProps {
	snake: Coordinate[];
	direction: Direction;
}

export const moveSnake = ({ snake, direction }: MoveSnakeProps) => {
	const head = { ...snake[0] };
	switch (direction) {
		case 'down':
			head.y += 1;
			break;
		case 'up':
			head.y -= 1;
			break;
		case 'left':
			head.x -= 1;
			break;
		case 'right':
			head.x += 1;
			break;
	}
	const newSnake: Coordinate[] = [head, ...snake.slice(0, -1)];

	return newSnake;
};
