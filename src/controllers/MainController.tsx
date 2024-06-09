import {LandingPage, GamePage} from "../pages";
import {useStore} from "../store/store.ts";

export const MainController = () => {
    const clickedPlay = useStore(state => state.clickedPlay)

    if (clickedPlay) return <GamePage/>;
    return <LandingPage/>
}