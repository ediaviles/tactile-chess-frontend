import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "../stylesheets/Navbar.css";

function Navbar() {
    return(
        <div className={'navbar-container'} data-testid={'navbar-container'}>
            <h3 className={'title'}>Tactile Chess</h3>
            <FontAwesomeIcon className={'bars'} icon={faBars} />
        </div>
    )
}

export default Navbar;