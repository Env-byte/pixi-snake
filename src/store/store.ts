import {create} from "zustand";

export interface CanvasSettings {
    width: number;
    height: number;
}

export interface SnakeSettings {
    dimensions: number;
    width: number;
}

interface Settings {
    canvas: CanvasSettings
    snake: SnakeSettings;
    debug: boolean;
}

export interface Coordinate {
    x: number;
    y: number;
}

interface Store {
    clickedPlay: boolean;
    settings: Settings;
    snakeSize: Coordinate[]
}

export const useStore = create<Store>(() => ({
    clickedPlay: false,
    settings: {
        canvas: {
            width: 600,
            height: 600
        },
        snake: {dimensions: 20, width: 4},
        debug: false
    },
    snakeSize: []
}))

export const setClickedPlay = (value: boolean) =>
    useStore.setState(() => ({clickedPlay: value}))


export const pushSnakeSize = (coordinate: Coordinate) =>
    useStore.setState((s) => ({snakeSize: [...s.snakeSize, coordinate]}))

