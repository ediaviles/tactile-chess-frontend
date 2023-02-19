import { Routes, Route } from "react-router";
import PlayChess from "./pages/PlayChess";
import Homepage from "./pages/Homepage";

function RoutePaths() {
    return(
        <>
            <Routes>
                <Route path={"/play"} element={<PlayChess />} />
                <Route path={"/"} element={<Homepage />} />
            </Routes>
        </>
    )
}

export default RoutePaths;