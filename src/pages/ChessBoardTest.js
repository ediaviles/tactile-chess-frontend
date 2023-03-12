import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";
import {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {eventController} from "../components/eventController";
import {fetchData} from "../components/ndJSONStreamReader";

function ChessBoardTest() {
    const [game, setGame] = useState(new Chess());
    const [gameId, setGameId] = useState(useParams());
    const [movesMade, setMovesMade] = useState(null);
    const [liveFen, setLiveFen] = useState(null)
    const [movesIndex, setMovesIndex] = useState(null);
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
        console.log(response)
        if (response.ok) {
            window.location.pathname = `/play`
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
        <>
            <Chessboard position={game.fen()}/>
            <button onClick={() => {startStream()}}>Start Stream</button>
            <button onClick={() => {resignGame()}}>Resign Game</button>
        </>
    )
}

export default ChessBoardTest;