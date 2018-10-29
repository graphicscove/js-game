import MyClass from './game-data'

class GameDataLoader {
    constructor() {
        if (MyClass.gameData !== null) {
            $.ajax({
                url: '../../../data.json',
                success: function(response) {
                    MyClass.gameData.push(response)
                }
            })
        } else {
            console.log('Already loaded')
        }
        console.log('the data is', MyClass.gameData)
    }
}

export default new GameDataLoader
