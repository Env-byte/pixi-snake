import { DisplayObject } from '@pixi/display';
import { Container, Graphics, PixiRef } from '@pixi/react';
import { useEffect } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { pushSnakeSegment, useStore } from '../store/store.ts';
import { applyMove } from '../utils/canvas.ts';
import { flipDirection } from './controls.ts';

interface UseDetectionCollisionProps {
	snake: PixiRef<typeof Graphics> | null;
	food: PixiRef<typeof Container> | null;
}

function testForAABB(object1: DisplayObject, object2: DisplayObject) {
	const bounds1 = object1.getBounds();
	const bounds2 = object2.getBounds();

	return bounds1.x < bounds2.x + bounds2.width && bounds1.x + bounds1.width > bounds2.x && bounds1.y < bounds2.y + bounds2.height && bounds1.y + bounds1.height > bounds2.y;
}

export const useDetectCollision = ({ snake, food }: UseDetectionCollisionProps) => {
	const [segments, direction] = useStore(useShallow((s) => [s.snake, s.direction]));
	useEffect(() => {
		food?.children.forEach((item) => {
			if (!snake) return;
			if (item.destroyed) return;
			if (!testForAABB(snake, item)) return;

			item?.destroy();
			const segment = segments[segments.length - 1];
			pushSnakeSegment(applyMove({ segment, direction: flipDirection(direction) }));
		});
	}, [direction, food, segments, snake]);
};
