export class GameConnectionController{


    static tryJoiningGame(id){

        throw new Error("Not implemented!");
    }

    static tryCreatingGame(){   

        throw new Error("Not implemented!");
    }

    static tryGettingGame(id){
        // TODO: Replace with real implementation
        console.log("Called tryGettingGame");
        return "2:3X,1:5X,1:2X,1:4X,2:7X,2:5X";
        // throw new Error("Not implemented!");
    }

    static tryUpdateGame(id, playerId, cupNr){
        // TODO: Replace with real implementation
        console.log("Called tryUpdateGame");
        // throw new Error("Not implemented!");
    }

    static tryQuitGame(id){
        console.log("Called tryQuitGame");
        // throw new Error("Not implemented!");
    }

}