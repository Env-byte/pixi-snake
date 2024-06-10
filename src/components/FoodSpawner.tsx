import { Graphics } from '@pixi/graphics';
import { Container } from '@pixi/react';
import _ from 'lodash';
import { forwardRef, useEffect, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useStore } from '../store/store.ts';
import { ContainerRef } from '../types/pixiTypes.ts';
import { divideCanvas, parseCoordinates } from '../utils/canvas.ts';

const maxSpawn = 10;

export const FoodSpawner = forwardRef<ContainerRef>((_props, ref) => {
	const [dimensions, canvas] = useStore(useShallow((state) => [state.settings.snake.dimensions, state.settings.canvas]));

	const containerRef = useRef<ContainerRef | null>(null);
	const grid = divideCanvas({ canvas, dimensions });
	useEffect(() => {
		const spawn = () => {
			if (containerRef.current === null) return;
			const count = containerRef.current?.children.length ?? 0;
			if (count >= maxSpawn) {
				return;
			}

			const { x, y } = parseCoordinates({
				coordinates: {
					x: _.random(0, grid.columns, false),
					y: _.random(0, grid.rows, false)
				},
				dimensions
			});
			const food = new Graphics().clear().beginFill('grey').lineStyle(2, 'black', 1).drawCircle(10, 10, 10);
			food.position.set(x, y);
			containerRef.current.addChild(food);
		};

		const interval = setInterval(() => {
			spawn();
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [dimensions, grid.columns, grid.rows, ref]);

	return (
		<Container
			ref={(node) => {
				containerRef.current = node;
				if (typeof ref === 'function') {
					ref(node);
					return;
				}
				if (ref) ref.current = node;
			}}
		/>
	);
});
