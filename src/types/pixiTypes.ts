import { Container, Graphics, PixiRef, Sprite } from '@pixi/react';
import { ComponentProps } from 'react';

export type ContainerRef = PixiRef<typeof Container>; // Pixi Container

export type Draw = Exclude<ComponentProps<typeof Graphics>['draw'], undefined>;
export type G = Parameters<Draw>[0];
export type GraphicRef = PixiRef<typeof Graphics>;
export type SpriteRef = PixiRef<typeof Sprite>;
