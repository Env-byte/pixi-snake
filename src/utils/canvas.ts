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
	const head = applyMove({ segment: snake[0], direction });
	return [head, ...snake.slice(0, -1)];
};

interface ApplyMoveProps {
	segment: Coordinate;
	direction: Direction;
}

export const applyMove = ({ segment, direction }: ApplyMoveProps) => {
	const newSegment = { ...segment };
	switch (direction) {
		case 'down':
			newSegment.y += 1;
			break;
		case 'up':
			newSegment.y -= 1;
			break;
		case 'left':
			newSegment.x -= 1;
			break;
		case 'right':
			newSegment.x += 1;
			break;
	}

	return newSegment;
};
