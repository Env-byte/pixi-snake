import {useStore} from "../store/store.ts";
import {useShallow} from "zustand/react/shallow";
import {JSX, useCallback, useState} from "react";
import {Graphics as PixiGraphics} from "@pixi/graphics";
import {TextStyle} from "@pixi/text";
import {Graphics, Text,} from "@pixi/react";
import {divideCanvas} from "../utils/canvas.ts";
import _ from "lodash";

export const DebugSquares = () => {

    const [snake, canvas] = useStore(useShallow(state => [state.settings.snake, state.settings.canvas]));

    const {dimensions, width} = snake;

    const {rows, columns} = divideCanvas({canvas, dimensions});

    const [text, setText] = useState<JSX.Element[]>([]);

    const draw = useCallback((g: PixiGraphics) => {
        g.clear();
        g.beginFill('white');
        g.lineStyle(width, 'rgba(255,0,0)', .1);
        g.moveTo(0, 0);
        _.times(rows, (row) => {
            _.times(columns, (column) => {
                const x = dimensions * column
                const y = dimensions * row;
                g.drawRect(x, y, dimensions, dimensions)
                const text = `${row},${column}`;
                setText((s) => [...s,
                    <Text key={text} style={new TextStyle({fontSize: '6px'})} text={text} x={x}
                          y={y + dimensions / 4}/>])
            });
        })
    }, [width, rows, columns, dimensions]);
    return <><Graphics draw={draw}/>{text}</>

}