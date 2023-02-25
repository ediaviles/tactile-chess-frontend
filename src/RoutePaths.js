import { Routes, Route } from "react-router";
import PlayChess from "./pages/PlayChess";
import Homepage from "./pages/Homepage";
import ChessBoardTest from "./pages/ChessBoardTest";

function RoutePaths() {
    return(
        <>
            <Routes>
                <Route path={"/play"} element={<PlayChess />} />
                <Route path={"/"} element={<Homepage />} />
                <Route path={`/test/:id`} element={<ChessBoardTest/>} />
                <Route path={`/test`} element={<ChessBoardTest/>} />
            </Routes>
        </>
    )
}

export default RoutePaths;