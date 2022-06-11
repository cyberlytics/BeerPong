import { GameConnectionController } from "../model/GameConnectionController";


function EndOfRound() {
    return(
        <div>
            <button onClick={GameConnectionController.tryFinishTurn}>
                Finish Turn
            </button>
        </div>
    )
}

export default EndOfRound