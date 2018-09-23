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
            }
        }

        this.cityInfo()
        this.resourceInfo()
        this.buildingsInfo()

        $('body').on('click', '[data-behaviour="upgrade"]', this.buildingsUpgrade)
        $('[data-behaviour="save-game"]').on('click', this.saveGame)
        $('[data-behaviour="load-save"]').on('click', this.loadGame)

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

        Notification.openNotification('success', `Upgrade of ${upgradeType} in progress`)

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
           if(timer === 0){
              clearInterval(tm)
              updateLevel()
           }
        }

        function updateLevel() {
            self.city.buildings[upgradeType].level = Number(Object.assign(newLevel, self.city.buildings[upgradeType].level))
            self.buildingsInfo()
            Notification.closeNotification()
        }

        // Update new resource totals
        this.resourceInfo()
    }

    cityNameChange = (e) => {
        const newName = $(e.currentTarget).text()
        this.city.name = newName
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
