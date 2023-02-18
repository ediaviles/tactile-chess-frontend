import Navbar from '../components/Navbar';
import "../stylesheets/Homepage.css";
import axios from "axios";

function Homepage() {
    return (
        <>
            <Navbar/>
            <div data-testid={"container"} />
            <iframe src="https://lichess.org/tv/frame?theme=brown&bg=dark" className={"test"} allowtransparency="true" frameborder="0" title={"Test"}></iframe>
            <button onClick={async () => {
                await axios.post(
                    "http://localhost:5000/seekGame"
                )
            }}>
                Create Game</button>
        </>
    )
}

export default Homepage;