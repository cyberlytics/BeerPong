import Field from "./Field";
import React from "react";
import {Link} from "react-router-dom";
import {GameConnectionController} from "../model/GameConnectionController";


class GamePage extends React.Component{

    constructor(props) {
        super(props);
        if (! 'gameID' in props){
            throw Error("Missing parameter for GameID");
        }
        if(!'userID' in props){
            throw Error("Missing parameter for UserID");
        }
        this.state = {
            gameID: props.gameID,
            userID: props.userID,
            updateString: "",
            gameString: GameConnectionController.tryGettingGame(props.gameID),
            activePlayer: false
        };
        // Restore the default form of the updateString
        this.resetUpdateString();


        // now we have the gameString and can determine weather we are the active player or not
        let splits = this.state.gameString.split(',');
        if(splits[splits.length - 1].startsWith(this.state.userID)){
            this.state.activePlayer = true;
        }
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            10000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick(){
        // check if we are the active player or not
        if(this.state.activePlayer === false){
            // we need to update the game
            let stateCopy = this.state;
            stateCopy.gameString = GameConnectionController.tryGettingGame(this.state.gameID);
            this.setState(stateCopy);
        }
    }

    resetUpdateString(){
        let stateCopy = this.state;
        stateCopy.updateString = this.state.userID + ":";
        this.setState(stateCopy);
    }

    cupClicked(cup){
        // check if we have to add or remove the cup
        // simple check if the updateString contains the cup
        if(this.state.updateString.contains(cup)){
            // remove
            let stateCopy = this.state;
            stateCopy.updateString.remove(cup);
            this.setState(stateCopy);
        }else{
            // add
            let stateCopy = this.state;
            stateCopy.updateString += cup;
            this.setState(stateCopy);
        }
    }

    render() {
        // Build up the default dictionary
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
            "p1_0_OnClick": this.state.userID === 3 ? null : (this.state.userID === 1 ?  function (){this.cupClicked(0)} : null),
            "p1_1_OnClick": this.state.userID === 3 ? null : (this.state.userID === 1 ?  function (){this.cupClicked(1)} : null),
            "p1_2_OnClick": this.state.userID === 3 ? null : (this.state.userID === 1 ?  function (){this.cupClicked(2)} : null),
            "p1_3_OnClick": this.state.userID === 3 ? null : (this.state.userID === 1 ?  function (){this.cupClicked(3)} : null),
            "p1_4_OnClick": this.state.userID === 3 ? null : (this.state.userID === 1 ?  function (){this.cupClicked(4)} : null),
            "p1_5_OnClick": this.state.userID === 3 ? null : (this.state.userID === 1 ?  function (){this.cupClicked(5)} : null),
            "p1_6_OnClick": this.state.userID === 3 ? null : (this.state.userID === 1 ?  function (){this.cupClicked(6)} : null),
            "p1_7_OnClick": this.state.userID === 3 ? null : (this.state.userID === 1 ?  function (){this.cupClicked(7)} : null),
            "p1_8_OnClick": this.state.userID === 3 ? null : (this.state.userID === 1 ?  function (){this.cupClicked(8)} : null),
            "p1_9_OnClick": this.state.userID === 3 ? null : (this.state.userID === 1 ?  function (){this.cupClicked(9)} : null),
            "p2_0_OnClick": this.state.userID === 3 ? null : (this.state.userID === 2 ?  function (){this.cupClicked(0)} : null),
            "p2_1_OnClick": this.state.userID === 3 ? null : (this.state.userID === 2 ?  function (){this.cupClicked(1)} : null),
            "p2_2_OnClick": this.state.userID === 3 ? null : (this.state.userID === 2 ?  function (){this.cupClicked(2)} : null),
            "p2_3_OnClick": this.state.userID === 3 ? null : (this.state.userID === 2 ?  function (){this.cupClicked(3)} : null),
            "p2_4_OnClick": this.state.userID === 3 ? null : (this.state.userID === 2 ?  function (){this.cupClicked(4)} : null),
            "p2_5_OnClick": this.state.userID === 3 ? null : (this.state.userID === 2 ?  function (){this.cupClicked(5)} : null),
            "p2_6_OnClick": this.state.userID === 3 ? null : (this.state.userID === 2 ?  function (){this.cupClicked(6)} : null),
            "p2_7_OnClick": this.state.userID === 3 ? null : (this.state.userID === 2 ?  function (){this.cupClicked(7)} : null),
            "p2_8_OnClick": this.state.userID === 3 ? null : (this.state.userID === 2 ?  function (){this.cupClicked(8)} : null),
            "p2_9_OnClick": this.state.userID === 3 ? null : (this.state.userID === 2 ?  function (){this.cupClicked(9)} : null),
        }

        // parse the game-string and set the className for the already hit cups to selected and remove the on-click
        let turns = this.state.gameString.split(',');
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
        for (let i = 2; i < this.state.updateString.length - this.state.userID.length - 2; i++){
            let cupName;
            let newClassName;
            if(this.state.userID === 1){
                cupName = "p1_" + this.state.updateString[i];
                newClassName = "cup1_unselected_clicked";

            }else{
                cupName = "p2_" + this.state.updateString[i];
                newClassName = "cup2_unselected_clicked";
            }

            // update css for the selected cup
            dict[cupName.concat("_className")] = newClassName;
        }

        let document = (
            <div>
                <p>ID: {this.state.gameID}</p>
                <Field dictVal={dict}/>
                {/* TODO: commit the hit cups*/}
                <button onClick={() => {GameConnectionController.tryUpdatingGame(this.state.gameID, this.state.updateString);
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
