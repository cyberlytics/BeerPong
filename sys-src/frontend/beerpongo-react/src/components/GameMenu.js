import { useState } from "react";
import { GameConnectionController } from "../model/GameConnectionController";





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
                <button 
                    onClick={() => {
                        GameConnectionController.tryJoiningGame(input)}}>
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