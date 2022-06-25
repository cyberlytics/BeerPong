import {useContext} from "react";
import { GameConnectionController } from "../model/GameConnectionController";
import {UserContext} from "../context/UserContext";
import {Link} from "react-router-dom";

//missing CSS
function GameMenu() {
    const {userID, setUserID, gameID, setGameID} = useContext(UserContext);
    return (
        <div>
            <div>
                <input
                    type="text"
                    name="gameid"
                    onChange={(e) => {
                        setGameID(e.target.value);
                        }}>
                 </input>
                <Link to={`game/${gameID}`}>
                    <span onClick={() => {
                        setUserID(GameConnectionController.tryJoiningGame(gameID))}}>
                    Join Game
                    </span>
                </Link>

            </div>

            <div>
                <button
                    onClick={() => {
                        GameConnectionController.tryCreatingGame()}}>
                    Create Game
                </button>
            </div>
        </div>
     );
}



export default GameMenu;