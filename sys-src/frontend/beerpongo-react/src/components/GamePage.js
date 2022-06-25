import Field from "./Field";
import React from "react";
import {Link} from "react-router-dom";
import {GameConnectionController} from "../model/GameConnectionController";
import {UserContext} from "../context/UserContext";



class GamePage extends React.Component{

    static contextType = UserContext;
    invalidContext;
    newState;
    defaultUpdateString;

    componentDidMount() {
        if(this.invalidContext) return;
        this.timerID = setInterval(
            () => this.tick(),
            10000
        );
    }

    componentWillUnmount() {
        if(this.timerID === undefined) return;
        clearInterval(this.timerID);
    }

    tick(){
        // check if we are the active player or not
        if(this.newState.activePlayer === false){
            // we need to update the game
            this.newState.gameString = GameConnectionController.tryGettingGame(this.newState.gameId);
            this.forceUpdate();
        }
    }

    resetUpdateString(){
        this.newState.updateString = this.newState.userId + ":";
    }

    cupClicked(cup){
        // check if we have to add or remove the cup
        // simple check if the updateString contains the cup
        let cups = "";
        if(this.newState.updateString.length > this.newState.userId.toString().length + 1){
            cups = this.newState.updateString.substring(this.newState.userId.toString().length + 1);
        }
        if(cups.includes(cup)){
            // remove
            this.newState.updateString = this.newState.updateString.substring(0, this.newState.userId.toString().length + 1) + cups.replace(cup.toString(), '');
        }else{
            // add
            this.newState.updateString += cup;
        }
        this.forceUpdate();
    }

    render() {
        // Update the state
        let {userID, setUserID, gameID, setGameID} = this.context;

        // check if we have a valid context
        if (userID === -1 && gameID === -1){
            this.invalidContext = true;
            // return an error message
            return (
                (
                    <div>
                        <p>Use the Button "Join" and do not enter the url for a specific game!</p>
                    </div>
                )
            ) ;
        }else{
            this.invalidContext = false;
        }

        this.defaultUpdateString = userID + ":";
        let gameString = GameConnectionController.tryGettingGame(gameID);
        let _activePlayer = false;
        // now we have the gameString and can determine weather we are the active player or not
        let splits = gameString.split(',');
        if(!splits[splits.length - 1].startsWith(userID)){
            _activePlayer = true;
        }

        let currUpdateString;
        if (this.newState === undefined){
            currUpdateString = this.defaultUpdateString;
        }else{
            currUpdateString = this.newState.updateString;
        }

        let state = {
            gameId: gameID,
            userId: userID,
            updateString: currUpdateString,
            gameString: gameString,
            activePlayer: _activePlayer
        };
        this.newState = state;

        // Build op the default dictionary
        let dict = {
            // Classnames
            "p1_0_className": "cup1_unselected",
            "p1_1_className": "cup1_unselected",
            "p1_2_className": "cup1_unselected",
            "p1_3_className": "cup1_unselected",
            "p1_4_className": "cup1_unselected",
            "p1_5_className": "cup1_unselected",
            "p1_6_className": "cup1_unselected",
            "p1_7_className": "cup1_unselected",
            "p1_8_className": "cup1_unselected",
            "p1_9_className": "cup1_unselected",
            "p2_0_className": "cup2_unselected",
            "p2_1_className": "cup2_unselected",
            "p2_2_className": "cup2_unselected",
            "p2_3_className": "cup2_unselected",
            "p2_4_className": "cup2_unselected",
            "p2_5_className": "cup2_unselected",
            "p2_6_className": "cup2_unselected",
            "p2_7_className": "cup2_unselected",
            "p2_8_className": "cup2_unselected",
            "p2_9_className": "cup2_unselected",
            // On-Click-Handlers -> We do not update after every button -> it is possible to select/unselect  cup
            // during one turn more than once -> we send an update-request after finishing the turn
            // We need to allow updates only for the correct side!
            // TODO: We need to get the real player-ID's here
            "p1_0_OnClick": (this.newState.userId === 3 || this.newState.userId === 2) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this, 0) : null),
            "p1_1_OnClick": (this.newState.userId === 3 || this.newState.userId === 2) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,1) : null),
            "p1_2_OnClick": (this.newState.userId === 3 || this.newState.userId === 2) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,2) : null),
            "p1_3_OnClick": (this.newState.userId === 3 || this.newState.userId === 2) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,3) : null),
            "p1_4_OnClick": (this.newState.userId === 3 || this.newState.userId === 2) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,4) : null),
            "p1_5_OnClick": (this.newState.userId === 3 || this.newState.userId === 2) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,5) : null),
            "p1_6_OnClick": (this.newState.userId === 3 || this.newState.userId === 2) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,6) : null),
            "p1_7_OnClick": (this.newState.userId === 3 || this.newState.userId === 2) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,7) : null),
            "p1_8_OnClick": (this.newState.userId === 3 || this.newState.userId === 2) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,8) : null),
            "p1_9_OnClick": (this.newState.userId === 3 || this.newState.userId === 2) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,9) : null),
            "p2_0_OnClick": (this.newState.userId === 3 || this.newState.userId === 1) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,0) : null),
            "p2_1_OnClick": (this.newState.userId === 3 || this.newState.userId === 1) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,1) : null),
            "p2_2_OnClick": (this.newState.userId === 3 || this.newState.userId === 1) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,2) : null),
            "p2_3_OnClick": (this.newState.userId === 3 || this.newState.userId === 1) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,3) : null),
            "p2_4_OnClick": (this.newState.userId === 3 || this.newState.userId === 1) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,4) : null),
            "p2_5_OnClick": (this.newState.userId === 3 || this.newState.userId === 1) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,5) : null),
            "p2_6_OnClick": (this.newState.userId === 3 || this.newState.userId === 1) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,6) : null),
            "p2_7_OnClick": (this.newState.userId === 3 || this.newState.userId === 1) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,7) : null),
            "p2_8_OnClick": (this.newState.userId === 3 || this.newState.userId === 1) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this,8) : null),
            "p2_9_OnClick": (this.newState.userId === 3 || this.newState.userId === 1) ? null : (this.newState.activePlayer === true ?  this.cupClicked.bind(this, 9) : null)
        }

        // parse the game-string and set the className for the already hit cups to selected and remove the on-click
        let turns = this.newState.gameString.split(',');
        for(const element of turns){
            let turn = element.split(':');
            if(turn.length === 2){
                let id = turn[0];
                let hits = turn[1];
                // TODO: later we need to decided here, which side the player with the current id is
                let cupName;
                let newClassName;
                // iterate all hits
                for(const cup in hits) {
                    if(cup !== 'X' && !isNaN(parseInt(cup, 10))){
                        if (id === "1") {
                            // now we can build the name of the cup in the field
                            cupName = "p1_" + cup;
                            newClassName = "cup1_selected";
                        } else if (id === "2") {
                            cupName = "p2_" + cup;
                            newClassName = "cup2_selected";
                        } else {
                            // invalid format
                            alert("Error during parsing the game!");
                            return <div>
                                <p>Error!</p>
                            </div>
                        }
                    }
                    // update the css for the hit cup
                    dict[cupName.concat("_className")] = newClassName;
                    // no reaction in clicks
                    dict[cupName.concat("_OnClick")] = null;
                }
            }else{
                // invalid format
                alert("Error during parsing the game!");
                return <div>
                    <p>Error!</p>
                </div>
            }
        }

        // parse the update-string and change the className for the currently selected cups for this round
        // do not check the id and the colon
        for (let i = this.newState.userId.toString().length + 1; i < this.newState.updateString.length; i++){
            let cupName;
            let newClassName;
            if(this.newState.userId === 1){
                cupName = "p1_" + this.newState.updateString[i];
                newClassName = "cup1_unselected_clicked";

            }else{
                cupName = "p2_" + this.newState.updateString[i];
                newClassName = "cup2_unselected_clicked";
            }

            // update css for the selected cup
            dict[cupName.concat("_className")] = newClassName;
        }

        let document = (
            <div>
                <p>ID: {this.newState.gameId}</p>
                <Field dictVal={dict}/>
                <button onClick={() => {GameConnectionController.tryUpdatingGame(this.newState.gameId,
                    this.newState.updateString);
                    this.resetUpdateString()}}>
                    Spielzug beenden
                </button>
                {/* Quitting the game will lead the user to the game menu page */}
                <nav>
                    <Link to="/">Spiel Beenden</Link>
                </nav>
            </div>
        );
        return (
            document
        );
    }
}

export default GamePage;
