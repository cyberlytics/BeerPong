import { GameConnectionController } from "../model/GameConnectionController";
import {useParams, useNavigate} from "react-router-dom";
import Field from "./Field";

function reload() {
    window.location.reload()
}

//missing CSS
function GamePage() {

    let refreshPage = window.setInterval(function(){
        reload();
    }, 10000);

    const {id} = useParams();
    const navigate = useNavigate();
    let gameString = GameConnectionController.tryGettingGame(id).split(',');

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
        // On-Click-Handlers
        // TODO: We need to get the real player-ID's here
        "p1_0_OnClick": function (){GameConnectionController.tryUpdateGame(id, 1, 0)},
        "p1_1_OnClick": function (){GameConnectionController.tryUpdateGame(id, 1, 1)},
        "p1_2_OnClick": function (){GameConnectionController.tryUpdateGame(id, 1, 2)},
        "p1_3_OnClick": function (){GameConnectionController.tryUpdateGame(id, 1, 3)},
        "p1_4_OnClick": function (){GameConnectionController.tryUpdateGame(id, 1, 4)},
        "p1_5_OnClick": function (){GameConnectionController.tryUpdateGame(id, 1, 5)},
        "p1_6_OnClick": function (){GameConnectionController.tryUpdateGame(id, 1, 6)},
        "p1_7_OnClick": function (){GameConnectionController.tryUpdateGame(id, 1, 7)},
        "p1_8_OnClick": function (){GameConnectionController.tryUpdateGame(id, 1, 8)},
        "p1_9_OnClick": function (){GameConnectionController.tryUpdateGame(id, 1, 9)},
        "p2_0_OnClick": function (){GameConnectionController.tryUpdateGame(id, 2, 0)},
        "p2_1_OnClick": function (){GameConnectionController.tryUpdateGame(id, 2, 1)},
        "p2_2_OnClick": function (){GameConnectionController.tryUpdateGame(id, 2, 2)},
        "p2_3_OnClick": function (){GameConnectionController.tryUpdateGame(id, 2, 3)},
        "p2_4_OnClick": function (){GameConnectionController.tryUpdateGame(id, 2, 4)},
        "p2_5_OnClick": function (){GameConnectionController.tryUpdateGame(id, 2, 5)},
        "p2_6_OnClick": function (){GameConnectionController.tryUpdateGame(id, 2, 6)},
        "p2_7_OnClick": function (){GameConnectionController.tryUpdateGame(id, 2, 7)},
        "p2_8_OnClick": function (){GameConnectionController.tryUpdateGame(id, 2, 8)},
        "p2_9_OnClick": function (){GameConnectionController.tryUpdateGame(id, 2, 9)}
    }

    // parse the game-string and set the className for the already hit cups to selected and remove the on-click
    for(const element of gameString){
        let turn = element.split(':');
        if(turn.length === 2){
            let id = turn[0];
            let pos = turn[1];
            if(pos.length === 2 && pos[1] === "X" && !isNaN(parseInt(pos[0], 10))) {
                // TODO: later we need to decided here, which side the player with the current id id
                let cupName;
                let newClassName;
                if (id === "1") {
                    // now we can build the name of the cup in the field
                    cupName = "p1_" + pos[0];
                    newClassName = "cup1_selected";
                } else if (id === "2") {
                    cupName = "p2_" + pos[0];
                    newClassName = "cup2_selected";
                }else{
                    // invalid format
                    alert("Error during parsing the game!");
                    return <div>
                        <p>Error!</p>
                    </div>
                }
                dict[cupName.concat("_className")] = newClassName;
                dict[cupName.concat("_OnClick")] = null;
            }else{
                // invalid format
                alert("Error during parsing the game!");
                return <div>
                    <p>Error!</p>
                </div>
            }
        }else{
            // invalid format
            alert("Error during parsing the game!");
            return <div>
                <p>Error!</p>
            </div>
        }
    }
    let document = (
        <div>
            <p>ID: {id}</p>
            <Field dictVal={dict}/>
            {/* TODO: commit the hitted cups*/}
            <button onClick={() => GameConnectionController.tryUpdatingGame("X")}>Spielzug beenden</button>
            {/* Quitting the game will lead the user to the game menu page */}
            <button onClick={() => navigate('/')}>Spiel Beenden</button>
        </div>
    );
    return (
        document
    );
}

export default GamePage;
