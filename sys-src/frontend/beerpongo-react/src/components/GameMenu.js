import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GameConnectionController } from "../model/GameConnectionController";





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
                <button 
                    onClick={() => {
                        playerid = GameConnectionController.tryJoiningGame(input);
                        navigate("/game/" + input);
                        }}>
                    Join Game
                </button>
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