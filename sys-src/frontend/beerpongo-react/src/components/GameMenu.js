import { GameConnectionController } from "../model/GameConnectionController";

//missing CSS
function GameMenu() {
    return ( 
        <div>
            <div>
                <input type="text" name="gameid"></input>
                <button onClick={GameConnectionController.tryJoiningGame}>Join Game</button>
            </div> 
            <div>    
                <button onClick={GameConnectionController.tryCreatingGame}>Create Game</button>
            </div>
        </div>
     );
}

export default GameMenu;



