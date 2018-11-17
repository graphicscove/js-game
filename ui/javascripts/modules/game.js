import Notification from './notification'

class Game {
    constructor() {
        // Set up some defaults for a new city
        this.city = {
            id: 1,
            name: 'Mercia',
            location: '1:1',
            resources:  {'food': 200, 'wood': 200, 'stone': 0, 'ore': 0, 'gold': 0 },
            buildings: {
                farm: {
                    name: 'Farm',
                    resource: 'food',
                    level: 0,
                    output: 2,
                    cost: {
                        food: 200,
                        wood: 100,
                        stone: 0,
                        ore: 0,
                        gold: 0
                    },
                    costMultiplier: 1.25
                },
                forest: {
                    name: 'Forest',
                    resource: 'wood',
                    level: 0,
                    output: 1.5,
                    cost: {
                        food: 100,
                        wood: 50,
                        stone: 0,
                        ore: 0,
                        gold: 0
                    },
                    costMultiplier: 1.5
                },
                stonemine: {
                    name: 'Stone Mine',
                    resource: 'stone',
                    level: 0,
                    output: 1,
                    cost: {
                        food: 100,
                        wood: 300,
                        stone: 0,
                        ore: 0,
                        gold: 0
                    },
                    costMultiplier: 1.75
                },
                oremine: {
                    name: 'Ore Mine',
                    resource: 'ore',
                    level: 0,
                    output: 0.75,
                    cost: {
                        food: 100,
                        wood: 300,
                        stone: 100,
                        ore: 0,
                        gold: 0
                    },
                    costMultiplier: 2
                },
                goldmine: {
                    name: 'Gold Mine',
                    resource: 'gold',
                    level: 0,
                    output: 0.25,
                    cost: {
                        food: 500,
                        wood: 300,
                        stone: 150,
                        ore: 50,
                        gold: 0
                    },
                    costMultiplier: 2.5
                }
            },
            troops: {
                scout: {
                    name: 'Scout',
                    cost: {
                        food: 50,
                        wood: 0,
                        stone: 0,
                        ore: 0,
                        gold: 0
                    },
                    count: 0,
                    time: 2
                }
            }
        }

        this.cityInfo()
        this.resourceInfo()
        this.buildingsInfo()
        this.troopsInfo()
        this.marketplaceInfo()

        $('body').on('click', '[data-behaviour="upgrade"]', this.buildingsUpgrade)
        $('body').on('click', '[data-behaviour="train"]', this.trainTroops)
        $('[data-behaviour="save-game"]').on('click', this.saveGame)
        $('[data-behaviour="load-save"]').on('click', this.loadGame)

        $('[data-behaviour="purchase"]').on('click', this.purchaseResources)

        window.setInterval(this.resourceProduction, 1000)

        $('.editable').on("keyup", this.cityNameChange);
    }

    // HTML output city stats
    cityInfo() {
        this.cityTemplate = `<p>
        <span>City ID: ${this.city.id}</span> |
        <span>City Name: <span contenteditable="true" class="editable">${this.city.name}</span></span> |
        <span>City Location: ${this.city.location}</span>
        </p>`

        $('[data-element="city"]').html(this.cityTemplate)
    }

    // HTML output to show how many resources are available
    resourceInfo() {
        this.resourceTemplate = `<p>
        <span>Food: ${this.city.resources.food}</span> |
        <span>Wood: ${this.city.resources.wood}</span> |
        <span>Stone: ${this.city.resources.stone}</span> |
        <span>Ore: ${this.city.resources.ore}</span> |
        <span>Gold: ${this.city.resources.gold}</span>
        </p>`

        $('[data-element="resources"]').html(this.resourceTemplate)
    }

    // HTML output to show buildings
    buildingsInfo = (e) => {
        const self = this
        this.buildingTemplate = ''

        // Show buildings, upgrade requirements and upgrade button
        Object.keys(this.city.buildings).map(function(objectKey, index) {
            const name = self.city.buildings[objectKey].name
            const newLevel = self.city.buildings[objectKey].level + 1
            let upgradeTime = ''
            self.resourceRequirement = ''
            self.resourceRequirement += `Food: ${self.city.buildings[objectKey].cost.food * newLevel} `
            self.resourceRequirement += `Wood: ${self.city.buildings[objectKey].cost.wood * newLevel} `
            self.resourceRequirement += `Stone: ${self.city.buildings[objectKey].cost.stone * newLevel} `
            self.resourceRequirement += `Ore: ${self.city.buildings[objectKey].cost.ore * newLevel} `
            self.resourceRequirement += `Gold: ${self.city.buildings[objectKey].cost.gold * newLevel} `

            if (self.city.buildings[objectKey].level * newLevel === 0) {
                upgradeTime = '1s'
            } else {
                upgradeTime = self.city.buildings[objectKey].level * newLevel + 's'
            }

            const buildingTemplate = `
            <div class="grid grid--space-between">
                <div>
                    <p><strong>${name}</strong> - Level ${self.city.buildings[objectKey].level} (${upgradeTime})<p>
                    <p>Upgrade Cost: ${self.resourceRequirement}</p>
                </div>
                <button data-behaviour="upgrade" data-type="${objectKey}" class="button button--primary">
                    Upgrade
                </button>
            </div>`
            self.buildingTemplate += buildingTemplate
        });
        $('[data-element="buildings"]').html(this.buildingTemplate)
    }

    // HTML output to show troops
    troopsInfo = (e) => {
        const self = this
        this.troopsTemplate = ''

        // Show toops, purchase requirements and purchase button
        Object.keys(this.city.troops).map(function(objectKey, index) {
            const name = self.city.troops[objectKey].name
            self.resourceRequirement = ''
            self.resourceRequirement += `Food: ${self.city.troops[objectKey].cost.food} `
            self.resourceRequirement += `Wood: ${self.city.troops[objectKey].cost.wood} `
            self.resourceRequirement += `Stone: ${self.city.troops[objectKey].cost.stone} `
            self.resourceRequirement += `Ore: ${self.city.troops[objectKey].cost.ore} `
            self.resourceRequirement += `Gold: ${self.city.troops[objectKey].cost.gold} `

            const troopsTemplate = `
            <div class="grid grid--space-between">
                <div>
                    <p><strong>${name}</strong> - ${self.city.troops[objectKey].count} in barracks (${self.city.troops[objectKey].time}s)<p>
                    <p>Training Cost: ${self.resourceRequirement}</p>
                </div>
                <button data-behaviour="train" data-type="${objectKey}" class="button button--primary">
                    Train
                </button>
            </div>`
            self.troopsTemplate += troopsTemplate
        });
        $('[data-element="troops"]').html(this.troopsTemplate)
    }

    // Resource multiplier times building level increases resources
    resourceProduction = (e) => {
        const self = this
        Object.keys(this.city.buildings).map(function(objectKey, index) {
            const level = self.city.buildings[objectKey].level
            const output = self.city.buildings[objectKey].output
            const resource = self.city.buildings[objectKey].resource
            const resourceValue = self.city.resources[resource]

            self.city.resources[resource] = Number(resourceValue + (level * output))
        });
        this.resourceInfo()
    }

    // Upgrade a buildings level
    buildingsUpgrade = (e) => {
        const upgradeType = $(e.currentTarget).data('type')
        const newLevel = this.city.buildings[upgradeType].level + 1

        // Check to see if there are enough resources
        if (this.city.resources.food < this.city.buildings[upgradeType].cost.food * newLevel ||
            this.city.resources.wood < this.city.buildings[upgradeType].cost.wood * newLevel ||
            this.city.resources.stone < this.city.buildings[upgradeType].cost.stone * newLevel ||
            this.city.resources.ore < this.city.buildings[upgradeType].cost.ore * newLevel ||
            this.city.resources.gold < this.city.buildings[upgradeType].cost.gold * newLevel) {
            Notification.openNotification('error', 'Not enough resources')
            return false;
        }

        let timer = 1000
        const self = this

        // Disable clicking any upgrade button again before the upgrade is complete
        $('[data-behaviour="upgrade"]').attr('disabled', true)

        // Remove resources from pool to intiate upgrade
        this.city.resources.food -= this.city.buildings[upgradeType].cost.food * newLevel
        this.city.resources.wood -= this.city.buildings[upgradeType].cost.wood * newLevel
        this.city.resources.stone -= this.city.buildings[upgradeType].cost.stone * newLevel
        this.city.resources.ore -= this.city.buildings[upgradeType].cost.ore * newLevel
        this.city.resources.gold -= this.city.buildings[upgradeType].cost.gold * newLevel

        if (this.city.buildings[upgradeType].level > 0 ) {
            timer = this.city.buildings[upgradeType].level * newLevel + '000'
        }

        var tm = setInterval(countDown, 1000);
        function countDown(){
           timer -= 1000;
           $('[data-element="countdown"]').html(self.millisToMinutesAndSeconds(timer))
           if(timer === 0){
              clearInterval(tm)
              updateLevel()
           }
        }

        Notification.openNotification('success', `Upgrade of ${upgradeType} in progress. Time remaining: <span data-element="countdown">Starting...</span>`)

        function updateLevel() {
            self.city.buildings[upgradeType].level = Number(Object.assign(newLevel, self.city.buildings[upgradeType].level))
            self.buildingsInfo()
            Notification.closeNotification()
        }

        this.resourceInfo()
        this.saveGame()
    }

    // Train troops
    trainTroops = (e) => {
        const upgradeType = $(e.currentTarget).data('type')
        const newLevel = this.city.troops[upgradeType].count + 1

        // Check to see if there are enough resources
        if (this.city.resources.food < this.city.troops[upgradeType].cost.food ||
            this.city.resources.wood < this.city.troops[upgradeType].cost.wood ||
            this.city.resources.stone < this.city.troops[upgradeType].cost.stone ||
            this.city.resources.ore < this.city.troops[upgradeType].cost.ore ||
            this.city.resources.gold < this.city.troops[upgradeType].cost.gold ) {
            Notification.openNotification('error', 'Not enough resources')
            return false;
        }

        Notification.openNotification('success', `Purchase of 1 ${upgradeType} in progress`)

        const self = this

        // Disable clicking any upgrade button again before the upgrade is complete
        $('[data-behaviour="train"]').attr('disabled', true)

        // Remove resources from pool to intiate upgrade
        this.city.resources.food -= this.city.troops[upgradeType].cost.food
        this.city.resources.wood -= this.city.troops[upgradeType].cost.wood
        this.city.resources.stone -= this.city.troops[upgradeType].cost.stone
        this.city.resources.ore -= this.city.troops[upgradeType].cost.ore
        this.city.resources.gold -= this.city.troops[upgradeType].cost.gold

        var tm = setInterval(countDown, 1000);
        let timer = this.city.troops[upgradeType].time
        function countDown(){
           timer -= self.city.troops[upgradeType].time
           if( timer === 0 ){
              clearInterval(tm)
              addPurchase()
           }
        }

        function addPurchase() {
            const currentCount = self.city.troops[upgradeType].count
            self.city.troops[upgradeType].count = currentCount + 1
            self.troopsInfo()
            Notification.closeNotification()
        }

        this.resourceInfo()
        this.saveGame()
    }

    marketplaceInfo = (e) => {
        this.marketplaceTemplate = `<p>All purchases cost 100 gold</p>
        <p>
        <button class="button button--primary" data-behaviour="purchase" data-resource-type="food">Buy 100 Food</button>
        <button class="button button--primary" data-behaviour="purchase" data-resource-type="wood">Buy 100 Wood</button>
        <button class="button button--primary" data-behaviour="purchase" data-resource-type="stone">Buy 100 Stone</button>
        <button class="button button--primary" data-behaviour="purchase" data-resource-type="ore">Buy 100 Ore</button>
        </p>`
        $('[data-element="marketplace"]').html(this.marketplaceTemplate)
    }

    purchaseResources = (e) => {
        const resourceType = $(e.currentTarget).data('resource-type')
        const purchaseCost = this.city.resources.gold - 100

        if ( purchaseCost <= 0) {
            Notification.openNotification('error', `Not enough gold`)
            return false
        }

        this.city.resources[resourceType] += 100
        this.city.resources.gold -= 100

        // Update new resource totals
        this.resourceInfo()
        this.saveGame()
    }

    cityNameChange = (e) => {
        const newName = $(e.currentTarget).text()
        this.city.name = newName
    }

    millisToMinutesAndSeconds = (millis) => {
      var minutes = Math.floor(millis / 60000);
      var seconds = ((millis % 60000) / 1000).toFixed(0);
      return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    saveGame = (e) => {
        // Put the object into storage
        localStorage.setItem('city', JSON.stringify(this.city))
    }

    loadGame = (e) => {
        // Retrieve the object from storage
        const retrievedObject = localStorage.getItem('city')

        // update the galaxy variable with the retrieved object
        this.city = JSON.parse(retrievedObject)

        // Regenerate the city with the new data
        this.cityInfo()
        this.resourceInfo()
        this.buildingsInfo()
    }
}

export default new Game
