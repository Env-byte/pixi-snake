import {Graphics} from "@pixi/react";
import {useCallback} from "react";
import {Graphics as PixiGraphics} from "@pixi/graphics";
import {useShallow} from "zustand/react/shallow";
import {Coordinate, useStore} from "../store/store.ts";
import {parseCoordinates} from "../utils/canvas.ts";

interface BuildSnakeProps {
    snakeSize: Coordinate[],
    g: PixiGraphics,
    dimensions: number //the dimensions of the snake
}

const buildSnake = ({snakeSize, dimensions, g}: BuildSnakeProps) => {

    snakeSize.forEach((coordinates) => {
        const parsedCoords = parseCoordinates({coordinates, dimensions});
        const position = parsedCoords.x - dimensions;
        g.drawRect(position + dimensions, parsedCoords.y - dimensions, dimensions, dimensions)
    })

}

export const Snake = () => {

    const [snakeSize, snake] = useStore(useShallow(state => [state.snakeSize, state.settings.snake]));
    const draw = useCallback((g: PixiGraphics) => {
        const {dimensions, width} = snake;
        g.clear();
        g.beginFill('grey');
        g.lineStyle(width, 'black', 1);
        g.moveTo(0, 0);
        buildSnake({snakeSize, g, dimensions})
    }, [snake, snakeSize]);
    return <Graphics draw={draw}/>

}