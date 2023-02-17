import Navbar from '../components/Navbar';
import "../stylesheets/Homepage.css";

function Homepage() {
    return (
        <>
            <Navbar/>
            <div data-testid={"container"} />
            <iframe src="https://lichess.org/tv/frame?theme=brown&bg=dark" className={"test"} allowtransparency="true" frameborder="0" title={"Test"}></iframe>
        </>
    )
}

export default Homepage;