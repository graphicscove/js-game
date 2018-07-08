class Game {
    constructor() {
        // Set up some defaults for a new city
        this.city = {
            id: 1,
            name: 'Mercia',
            location: '1:1',
            resources:  {'food': 100, 'wood': 200, 'stone': 0, 'ore': 0, 'gold': 0 },
            buildings: {
                farm: {
                    name: 'Farm',
                    resource: 'food',
                    level: 0,
                    output: 2
                },
                forest: {
                    name: 'forest',
                    resource: 'wood',
                    level: 0,
                    output: 1.5
                },
                stonemine: {
                    name: 'Stone Mine',
                    resource: 'stone',
                    level: 0,
                    output: 1
                },
                oremine: {
                    name: 'Ore Mine',
                    resource: 'ore',
                    level: 0,
                    output: 0.75
                },
                goldmine: {
                    name: 'Gold Mine',
                    resource: 'gold',
                    level: 0,
                    output: 0.25
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

    }

    // HTML output city stats
    cityInfo() {
        this.cityTemplate = `<p>
        <span>City ID: ${this.city.id}</span> |
        <span>City Name: ${this.city.name}</span> |
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
        // Object.keys(this.city.buildings).map(function(objectKey, index) {
        //     const buildingName = self.city.buildings[objectKey].name
        //     const buildingLevel = self.city.buildings[objectKey].level
        //
        //     const test = `<div>${buildingName} Level ${buildingLevel} <button data-behaviour="upgrade" data-type="${buildingName}">Upgrade ${buildingName}</button></div>`
        //
        //     $('[data-element="buildings"]').insertAdjacentHTML('beforeend', test);
        // });

        this.buildingTemplate = `
        <div>Farm Level ${this.city.buildings.farm.level} <button data-behaviour="upgrade" data-type="farm">Upgrade ${this.city.buildings.farm.name}</button></div>
        <div>Forest level ${this.city.buildings.forest.level} <button data-behaviour="upgrade" data-type="forest">Upgrade ${this.city.buildings.forest.name}</button></div>
        <div>Stone Mine level ${this.city.buildings.stonemine.level} <button data-behaviour="upgrade" data-type="stonemine">Upgrade ${this.city.buildings.stonemine.name}</button></div>
        <div>Ore Mine level ${this.city.buildings.oremine.level} <button data-behaviour="upgrade" data-type="oremine">Upgrade ${this.city.buildings.oremine.name}</button></div>
        <div>Gold Mine level ${this.city.buildings.goldmine.level} <button data-behaviour="upgrade" data-type="goldmine">Upgrade ${this.city.buildings.goldmine.name}</button></div>
        `

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
        $(e.currentTarget).attr('disabled', true)
        const upgradeType = $(e.currentTarget).data('type')
        const newLevel = this.city.buildings[upgradeType].level + 1
        let timer = 0
        if (this.city.buildings[upgradeType].level === 0 ) {
            timer = 1000
            setTimeout(function(){
                updateLevel()
            }, timer);
        } else {
            timer = this.city.buildings[upgradeType].level * newLevel + '000'
            setTimeout(function(){
                updateLevel()
            }, timer);
        }
        const self = this

        function updateLevel() {
            self.city.buildings[upgradeType].level = Number(Object.assign(newLevel, self.city.buildings[upgradeType].level))
            self.buildingsInfo()
        }

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
