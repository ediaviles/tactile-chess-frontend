import {eventController} from "./eventController";
import {useNavigate} from "react-router";

const headers = {
    Authorization: 'Bearer ' + 'lip_Zt6rLGHWhZj8qcaeTaLG'
};

export const fetchData = async (command, data) => {
    let response = null;
    switch (command) {
        case 'stream events': {
            response = await fetch('https://lichess.org/api/stream/event', {
                headers: headers,
                method: 'GET',
                mode: 'cors'
            })
            break;
        }
        case 'game start': {
            const gameId = data.gameId
            window.location.pathname = `/test/${gameId}`;
            break;
        }
        case 'stream game': {
            const gameId = data.gameId
            response = await fetch(`https://lichess.org/api/stream/game/${gameId}`, {
                headers: headers,
                method: 'GET',
                mode: 'cors'
            })
            break;
        }

        default:
            break;
    }
    const reader = response.body.getReader();
    let decoder = new TextDecoder('utf-8');
    let partialData = '';
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }

        partialData += decoder.decode(value);

        // Split the partial data on newlines to separate NDJSON messages
        const messages = partialData.split('\n');

        // Keep the last incomplete message for the next iteration
        partialData = messages.pop();

        // Parse and add the complete messages to the component state
        for (const message of messages) {
            try {
                const newData = JSON.parse(message);
                console.log(newData)
                if (data !== null && "id" in newData && "turns" in newData && "fen" in newData && "setLiveState" in data) {
                    data.setLiveState(newData)
                    console.log("calling setLiveState")
                }
                else if (data !== null && "lm" in newData && "fen" in newData && "setLm" in data) {
                    newData.setLm = data.setLm;
                }
                await eventController(newData)
            } catch (error) {
                console.error(error);
            }
        }
    }
};
