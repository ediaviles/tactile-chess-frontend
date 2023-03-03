import {ChessBoard} from "react-fen-chess-board";

function MyChessBoard(props) {
    return (
        <>
            <ChessBoard fen={props.fen} />
        </>
    )
}

export default MyChessBoard