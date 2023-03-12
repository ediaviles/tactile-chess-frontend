import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";
import {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {eventController} from "../components/eventController";
import {fetchData} from "../components/ndJSONStreamReader";

function ChessBoardTest() {
    const [game, setGame] = useState(new Chess());
    const [liveState, setLiveState] = useState(null);
    const [move, setMove] = useState('');
    const [gameId, setGameId] = useState(useParams());
    const [movesMade, setMovesMade] = useState(null);
    const [liveFen, setLiveFen] = useState(null)
    const [movesIndex, setMovesIndex] = useState(null);


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

    //Use effect that handles making the latests moves
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
/*
    useEffect(() => {
        if (liveState )
        const copy = new Chess(liveState.fen)
        setGame(copy)
    }, [liveState])*/

    const startStream = () => {
        fetchData("stream events", null).then(r => {});
    }

    const handleGameStart = () => {
        if (Object.keys(gameId).length !== 0) {
            fetchData('stream game', {gameId: gameId.id, setMovesIndex: setMovesIndex, setMovesMade: setMovesMade, setLiveFen: setLiveFen }).then(r => {})
        }
    }

    const submitMove = (m) => {
        if (m.length !== 4) {
            console.log("Incorrectly formatted move")
        } else {
            let src = m.substring(0, 2);
            let dest = m.substring(2, 4);
            let move = null;
            safeGameMutate((game) => {
                move = game.move({
                    from: src,
                    to: dest,
                    promotion: 'q'
                })
            })
            //illegal move TODO need to fix this logic
            if (move === 1) {
                return false;
            } /*else {
                eventController({type: "makeMove", gameId: gameId.id, move: src+dest}).then(r => {})
            }*/
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

    const renderChess = (fen) => {
        if (fen !== null ) {
            game.load(fen)
            return(
                <Chessboard position={game.fen()}/>
            )
        }
        else {
            return(
                <></>
            )
        }

    }

    return (
        <>
            {/*{renderChess(liveFen)}*/}
            <Chessboard position={game.fen()}/>
            <input onChange={(evt) => {setGameId(evt.target.value)}} type={"text"}/><button onClick={() => {startStream()}}>Start Stream</button>
            <input onChange={(evt) => {setMove(evt.target.value)}} type={"text"}/><button onClick={() => {}}>Submit</button>
        </>
    )
}

export default ChessBoardTest;