import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../stylesheets/OptionBlock.css"

function OptionBlock(props) {
    const displayText = props.text;
    const displayImg = props.icon;

    return (
        <div className={"optionContainer"}>
            <h6 className={"optionText"}>{displayText}</h6>
            <FontAwesomeIcon className={"optionIcon"} icon={displayImg} size={"6x"}/>
        </div>
    )
}

export default OptionBlock;