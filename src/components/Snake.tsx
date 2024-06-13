import { Texture } from '@pixi/core';
import { Container, Sprite, useTick } from '@pixi/react';
import { Point } from 'pixi.js';
import { forwardRef, useMemo, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Direction } from '../hooks';
import { useStore } from '../store/store.ts';
import { ContainerRef } from '../types/pixiTypes.ts';

interface GetPosProps {
	direction: Direction;
	position: Point;
	speed: number;
}

const getPos = ({ position, direction, speed }: GetPosProps) => {
	switch (direction) {
		case 'up':
			return new Point(position.x, position.y - speed);
		case 'down':
			return new Point(position.x, position.y + speed);
		case 'left':
			return new Point(position.x - speed, position.y);
		case 'right':
			return new Point(position.x + speed, position.y);
	}
};

export const Snake = forwardRef<ContainerRef>((_, ref) => {
	const [speed, direction] = useStore(useShallow((state) => [state.settings.snake.speed, state.direction]));

	const snakeRef = useRef<ContainerRef | null>(null);

	useTick(() => {
		const snake = snakeRef.current;
		if (!snake) return;
		const position = new Point(snake.position.x, snake.position.y);
		snake.position = getPos({ speed, direction, position });
	});

	return (
		<Container
			ref={(node) => {
				snakeRef.current = node;
				if (typeof ref === 'function') {
					ref(node);
					return;
				}
				if (ref) ref.current = node;
			}}
		>
			<SnakeSegments />
		</Container>
	);
});

const SnakeSegments = () => {
	const [snake, snakeSettings] = useStore(useShallow((state) => [state.snake, state.settings.snake]));

	const sprites = useMemo(() => {
		return snake.map((segment, index) => {
			return <Sprite key={`segment-${index}`} tint={index === 0 ? 'red' : 'green'} position={segment} width={snakeSettings.dimensions} height={snakeSettings.dimensions} texture={Texture.WHITE} />;
		});
	}, [snake, snakeSettings.dimensions]);

	return <>{sprites}</>;
};
