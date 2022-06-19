import axios from 'axios'
import {GET_GAME_URL, POST_GAME_URL, PUT_GAME_URL} from "../constants/BackendUrl";

export class GameConnectionController {

  static tryGettingGame(gameId) {
    const url = GET_GAME_URL.replace("{GAME_ID}", gameId)
    axios.get(url)
      .then(response => {
        console.log("Try getting game received: ", response);
        return response.data;
      }).catch(err => {
      console.error(err)
      throw Error("Get joining game failed");
    })
  }

  static tryCreatingGame() {
    axios.post(POST_GAME_URL).then(response => {
      console.log("Try creating game received: ", response);
      return response.data;
    }).catch(err => {
      console.error(err)
      throw Error("Post creating game failed");
    })
  }

  static tryUpdatingGame(gameId, gameUpdate) {
    let data = {
      "id": gameId,
      "state": gameUpdate
    }

    axios.put(PUT_GAME_URL, data)
      .then(response => {
        console.log("Try updating game received: ", response);
        return response.data
      }).catch(err => {
      console.error(err)
      throw Error("Put updating game failed");
    })
  }

  static tryJoiningGame(gameId){
    throw Error("Not implemented!");
  }

}
