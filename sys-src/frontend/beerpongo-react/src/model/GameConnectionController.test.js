import { GameConnectionController } from "./GameConnectionController";
//import Jest from 'jest'

it('first test', () => {
    expect(1+1).toEqual(2);
})

describe('tryGettingGame', () => {
    it('right state', () => {
        expect(GameConnectionController.tryGettingGame("12345678")).toEqual("5:08,3:12,5:08,3:12");
    })

    it('Error, if Game does not exist', () => {
        expect(GameConnectionController.tryGettingGame("a")).toThrowError(new Error("Get joining game failed"));
    })
})

describe('tryJoiningGame', () => {
    it('right state', () => {
        expect(GameConnectionController.tryJoiningGame("12345678")).toEqual("5:08,3:12,5:08,3:12");
    })

    it('Error, if Game does not exist', () =>{
        expect(GameConnectionController.tryJoiningGame("a")).toThrowError(new Error("Trying to join game with Id: 12345678 failed!"))
    })
})

describe('tryCreatingGame', () => {
    it('runs correctly', () => {
        let resp = {
        "statusCode": 200
      }
        expect(GameConnectionController.tryCreatingGame()).toEqual(resp);
    })

    //TODO: test error 
})

describe('tryUpdatingGame', () => {
    it('updates a game state correctly', () => {
        //getting the current state of a game
        let currentState = GameConnectionController.tryGettingGame("5ux59QVQ");
        expext(GameConnectionController.tryUpdatingGame("5ux59QVQ", "5:1")).toEqual(currentState + "5:1");
    })
})
    