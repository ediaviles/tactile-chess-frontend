import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";
import {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {eventController} from "../components/eventController";
import {fetchData} from "../components/ndJSONStreamReader";
import "../stylesheets/ChessBoard.css"

function ChessBoardTest() {
    const [game, setGame] = useState(new Chess());
    const [gameId, _] = useState(useParams());
    const [movesMade, setMovesMade] = useState(null);
    const [liveFen, setLiveFen] = useState(null)
    const [movesIndex, setMovesIndex] = useState(null);
    const [whiteMoves, setWhiteMoves] = useState([]);
    const [blackMoves, setBlackMoves] = useState([])
    const headers = {
        Authorization: 'Bearer ' + 'lip_Zt6rLGHWhZj8qcaeTaLG'
    }

    useEffect( () => {
         handleGameStart()
    }, []) // This will start a stream of the moves on page load


    useEffect(() => {
        if (liveFen !== null) {
            safeGameMutate((game) => {
                game.load(liveFen)
            })
        }
    }, [liveFen])

    //Use effect that handles making the latest moves
    useEffect(() => {
        if (liveFen !== null && movesMade !== null){
            for (let i = movesIndex; i < movesMade.length; i++) {
                let src = movesMade[i].substring(0, 2);
                let dest = movesMade[i].substring(2, 4);
                safeGameMutate((game) => {
                    game.move({
                        from: src,
                        to: dest,
                        promotion: 'q'
                    })
                })
                if (i%2 === 0) {
                    whiteMoves.push(movesMade[i])
                    setWhiteMoves(whiteMoves)
                } else {
                    blackMoves.push(movesMade[i])
                    setBlackMoves(blackMoves)
                }
            }
            setMovesIndex(movesMade.length)
        }
    }, [movesMade])

    const startStream = () => {
        fetchData("stream events", null).then(r => {});
    }

    const handleGameStart = () => {
        if (Object.keys(gameId).length !== 0) {
            fetchData('stream game', {gameId: gameId.id, setMovesIndex: setMovesIndex, setMovesMade: setMovesMade, setLiveFen: setLiveFen }).then(r => {})
        }
    }

    const resignGame = async () => {
        let response = await fetch(`https://lichess.org/api/board/game/${gameId.id}/resign`, {
            headers: headers,
            method: 'POST',
            mode: 'cors'
        })
        if (response.ok) {
            window.location.pathname = `/play`
        }
    }

    const renderMoves = (startingIndex) => {
        for (let i = startingIndex; i < movesMade.length; i = i + 2){
            return <p>{movesMade[i]}</p>
        }
    }

    //Perform a function on the game state
    function safeGameMutate(modify) {
        setGame(  (g) => {
            const update = new Chess(g.fen())
            modify(update)
            return update;
        })
    }

    return (
        <div className={"chessPageContainer"}>
            <div className={"chessboard-container"}>
                <Chessboard position={game.fen()}/>
            </div>
            <div className={"gameInfo-container"}>
                <h5 className={"white"}>White</h5>
                <h5 className={"black"}>Black</h5>
                <div className={"white-moves-container"}>
                    {whiteMoves.map((move) => {
                        return <p>{move}</p>
                    })}
                </div>
                <div className={"black-moves-container"}>
                    {blackMoves.map((move) => {
                        return <p>{move}</p>
                        })}
                </div>
            </div>
        </div>
        
    )
}

export default ChessBoardTest;