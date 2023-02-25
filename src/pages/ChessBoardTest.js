import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";
import {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {eventController} from "../components/eventController";
import {fetchData} from "../components/ndJSONStreamReader";

function ChessBoardTest() {
    const [game, setGame] = useState(new Chess());
    const [move, setMove] = useState('')
    const [gameId, setGameId] = useState(useParams());
    const [lm, setLm] = useState('')

    useEffect(() => {
        handleGameStart()
    }, []) // This will start a stream of the moves on page load

    useEffect(() => {
        if (lm.length === 4){
            submitMove(lm)
        }
    }, [lm])
    const startStream = () => {
        console.log("start stream called")
        fetchData("stream events", null).then(r => {});
    }

    const handleGameStart = () => {
        if (Object.keys(gameId).length !== 0) {
            fetchData('stream game', {gameId: gameId.id, setLm: setLm, lm: lm}).then(r => {})
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
            } else {
                eventController({type: "makeMove", gameId: gameId.id, move: src+dest}).then(r => {})
            }
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

    //Perform an action when a piece is dropped by a user
/*    async function onDrop(source, target) {
        let move = null;
        await safeGameMutate((game) => {
            move = game.move({
                from: source,
                to: target,
                promotion: 'q'
            })
        })
        //illegal move
        if (move === null) {
            return false;
        }
        //valid move
        /!*setTimeout( ()=> {
            const possibleMove = game.moves();
            console.log(possibleMove)
            //exit if the game is over
            if (game.isGameOver() || game.isDraw() || possibleMove.length === 0) return;

            const randomIndex = Math.floor(Math.random() * possibleMove.length);
            //play random move
            safeGameMutate((game) => {
                game.move(possibleMove[randomIndex]);
            })
        }, 200);*!/
        return true;
    }*/


    return (
        <>
            <Chessboard
            position={game.fen()}
            />
            <input onChange={(evt) => {setGameId(evt.target.value)}} type={"text"}/><button onClick={() => {startStream()}}>Start Stream</button>
            <input onChange={(evt) => {setMove(evt.target.value)}} type={"text"}/><button onClick={() => {setLm(move)}}>Submit</button>
        </>
    )
}

export default ChessBoardTest;