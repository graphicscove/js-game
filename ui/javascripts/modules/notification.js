class Notification {
    constructor() {
        this.notificationClass = {
            success: 'notification--success',
            warning: 'notification--warning',
            error: 'notification--error'
        }
        this.notification = $('[data-element="notification"]')
        this.notificationContent = $('[data-element="custom-response"]')

        $('[data-behaviour="close-notification"]').on('click', this.closeNotification)
    }

    openNotification(response, customMessage) {
        this.notification.addClass('notification--' + response)
        this.notificationContent.html(customMessage)
        this.notification.show()
    }

    closeNotification = (e, delay = 'false') => {
        if (delay === 'false') {
            this.notification.hide()
            this.cleanNotification()
        } else {
            setTimeout(function() {
                this.notification.hide()
                this.cleanNotification()
            }, 3000)
        }
    }

    cleanNotification = () => {
        const addedClass = Object.keys(this.notificationClass)
        for (let i = 0; i < addedClass.length; i++) {
            if (this.notification.hasClass('notification--' + addedClass[i])) {
                this.notification.removeClass('notification--' + addedClass[i])
                break
            }
        }
        this.notificationContent.empty()
    }
}

export default new Notification
