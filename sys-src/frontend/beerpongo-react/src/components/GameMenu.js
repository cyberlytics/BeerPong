import { GameConnectionController } from "../model/GameConnectionController";

//missing CSS
function GameMenu() {
    return ( 
        <div>
            <div>
                <input type="text" name="gameid"></input>
                {/* TODO: We need to pass the input of 'gameid' to the function */}
                <button onClick={() => {GameConnectionController.tryJoiningGame(123)}}>Join Game</button>
            </div> 
            <div>    
                <button onClick={() => {GameConnectionController.tryCreatingGame()}}>Create Game</button>
            </div>
        </div>
     );
}

export default GameMenu;