import { Point } from 'pixi.js';
import { create } from 'zustand';
import { Direction } from '../hooks';

export interface CanvasSettings {
	width: number;
	height: number;
}

export interface SnakeSettings {
	dimensions: number;
	width: number;
	speed: number;
}

interface Settings {
	canvas: CanvasSettings;
	snake: SnakeSettings;
	debug: boolean;
}

interface Store {
	clickedPlay: boolean;
	settings: Settings;
	snake: Point[];
	direction: Direction;
}

export const useStore = create<Store>(() => ({
	clickedPlay: false,
	settings: {
		canvas: {
			width: 600,
			height: 600
		},
		snake: { dimensions: 20, width: 1, speed: 0.3 },
		debug: false
	},
	snake: [],
	direction: 'up'
}));

export const setClickedPlay = (value: boolean) => useStore.setState(() => ({ clickedPlay: value }));

export const pushSnakeSegment = (coordinate: Point) => useStore.setState((s) => ({ snake: [...s.snake, coordinate] }));

export const setSnake = (snake: Point[]) => useStore.setState(() => ({ snake }));

export const setDirection = (direction: Direction) => useStore.setState(() => ({ direction }));
