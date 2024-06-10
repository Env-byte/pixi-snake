import { Container, Graphics, PixiRef } from '@pixi/react';

interface UseDetectionCollisionProps {
	snake: PixiRef<typeof Graphics> | null;
	food: PixiRef<typeof Container> | null;
}

export const useDetectCollision = ({ snake, food }: UseDetectionCollisionProps) => {
	console.log('snake', snake, 'food', food?.children);
};
