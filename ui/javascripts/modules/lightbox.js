class Lightbox {

    constructor () {
        this.lightbox = $('[data-element="lightbox"]')
        this.trigger = $('[data-behaviour="open-lightbox"]')
        this.openClass = 'lightbox--is-open'
        this.close = $('[data-behaviour="close-lightbox"]')

        this.trigger.on('click', this.openLightbox)
        $('body').on('click', this.close, this.closeLightbox)
    }

    openLightbox = (content = 'No content') => {
        this.lightbox.addClass(this.openClass)
        this.lightbox.find('.lightbox__content').html(content)
        this.lightbox.prepend('<div class="lightbox__close" data-behaviour="close-lightbox">X</div>')
    }

    closeLightbox = (e) => {
        this.lightbox.removeClass(this.openClass)
        this.lightbox.empty()
    }
}

export default new Lightbox
