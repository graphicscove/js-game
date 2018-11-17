class Tabs {

    constructor () {
        this.tab = $('[data-behaviour="tabs"]')

        this.tab.on('click', this.toggleTab)
        this.class = {
            button: 'tabs__link--active',
            content: 'tab-content__item--active'
        }
        if (this.tab.length > 1){
            this.tab[0].click()
        }
    }

    toggleTab = (e) => {
        const tab = $(e.currentTarget)
        const target = tab.data('target')
        const content = $('[data-element="' + target + '"]')

        content.siblings().removeClass(this.class.content)
        content.addClass(this.class.content)
        this.tab.removeClass(this.class.button)
        tab.addClass(this.class.button)
    }
}

export default new Tabs
