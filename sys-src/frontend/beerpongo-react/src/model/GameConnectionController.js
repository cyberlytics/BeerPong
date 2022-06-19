import axios from 'axios'
import {GET_GAME_URL, POST_GAME_URL, PUT_GAME_URL} from "../constants/BackendUrl";

export class GameConnectionController {

  static tryCreatingGame() {
    axios.post(POST_GAME_URL).then(data => {
      // Todo
      console.log(data);
    }).catch(err => {
      // Todo
      console.error(err)
    })
  }

  static tryJoiningGame(gameId) {
    const url = GET_GAME_URL.replace("{GAME_ID}", gameId)

    axios.get(url)
      .then(data => {
        // Todo
        console.log(data);
      }).catch(err => {
      // Todo
      console.error(err)
    })
  }

  static tryUpdatingGame(gameUpdate) {
    axios.put(PUT_GAME_URL, gameUpdate)
      .then(data => {
        // Todo
        console.log(data);
      }).catch(err => {
      // Todo
      console.error(err)
    })
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
  
}