import {Box} from "@mui/material";
import {Stage} from "@pixi/react";
import {Snake} from "../components";
import {DebugSquares} from "../components/DebugSquares.tsx";


export const GamePage = () => {



    return <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
        <Stage style={{borderRadius: '4px'}} options={{background: 'lightgrey'}} height={600}
               width={600}>
            <DebugSquares/>
            <Snake/>
        </Stage>
    </Box>
}