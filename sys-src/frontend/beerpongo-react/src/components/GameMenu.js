import { useState } from "react";
import { GameConnectionController } from "../model/GameConnectionController";
import {Link} from "react-router-dom";





//missing CSS
function GameMenu() {

    let [input, setInput] = useState(0);

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