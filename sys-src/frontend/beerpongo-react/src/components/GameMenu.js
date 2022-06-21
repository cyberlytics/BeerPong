import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameConnectionController } from "../model/GameConnectionController";
import {Link} from "react-router-dom";





//missing CSS
function GameMenu() {

    let [input, setInput, playerid] = useState(0);
    let navigate = useNavigate()
    return ( 
        <div>
            <div>
                <input 
                    type="text" 
                    name="gameid" 
                    onChange={(e) => {
                        setInput(e.target.value)}}>
                 </input>
                <Link to={`game/${input}`} state={{userID: 0}}>
                    <span onClick={() => {
                        GameConnectionController.tryJoiningGame(input)}}>
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