import {fetchData} from "./ndJSONStreamReader";

const headers = {
    Authorization: 'Bearer ' + 'lip_Zt6rLGHWhZj8qcaeTaLG'
};

export async function eventController(data) {
    switch(data.type) {
        case 'gameStart': {
            // once a game is started we want to open a new event stream to listen for chess moves being made
            //TODO
            let gid = data.game.gameId;
            fetchData('game start', {gameId: gid}).then(r => {console.log("game stream started")})
            break;
        }
        case 'gameFinish': {
            // once a game is finished we close all streams and redirect user to home page
            //TODO
            break;
        }
        case 'makeMove': {
            const gameId = data.gameId
            const move = data.move
            await fetch(`https://lichess.org/api/board/game/${gameId}/move/${move}`,
                {headers: headers,
                method: 'POST',
                mode: 'cors'})
            break;
        }
        default: {
            // Treat default as a move made
            //TODO read the move and update that move onto the board
            if ("lm" in data && data.lm !== data.gameLm) {
                const newMove = data.lm
                data.setLm(newMove)
            }
            break;
        }
    }
}