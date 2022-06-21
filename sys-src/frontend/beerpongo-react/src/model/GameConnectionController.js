import axios from 'axios'
import {GET_GAME_URL, POST_GAME_URL, PUT_GAME_URL, JOIN_GAME_URL} from "../constants/BackendUrl";

export class GameConnectionController {
  
  static tryJoiningGame(gameId) {
    const url = JOIN_GAME_URL.replace("{GAME_ID}", gameId)
    axios.get(url)
      .then(response => {
        console.log(response);
        return response.data;
      }).catch(err => {
      console.error(err);
      throw Error("Trying to join game with Id: " + gameId + "failed!");
        })
  }

}