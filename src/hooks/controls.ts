import { useEffect } from 'react';

export type Direction = 'up' | 'down' | 'left' | 'right';

export const flipDirection = (direction: Direction) => {
	if (direction === 'up') return 'down';
	if (direction === 'down') return 'up';
	if (direction === 'left') return 'right';
	return 'left';
};

interface UseArrowKeyProp {
	callback: (key: Direction) => void;
}

export const useArrowKeys = ({ callback }: UseArrowKeyProp) => {
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'ArrowUp':
				case 'ArrowDown':
				case 'ArrowLeft':
				case 'ArrowRight':
					callback(e.key.replace('Arrow', '').toLowerCase() as Direction);
					break;
			}
		};
		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [callback]);
};
