// Clean notification function
function cleanNotification() {
    this.notificationClass = {
        success: 'notification--success',
        warning: 'notification--warning',
        error: 'notification--error'
    }
    const addedClass = Object.keys(this.notificationClass)
    for (let i = 0; i < addedClass.length; i++) {
        if ($('[data-element="notification"]').hasClass('notification--' + addedClass[i])) {
            $('[data-element="notification"]').removeClass('notification--' + addedClass[i])
            break
        }
    }
    $('[data-element="custom-response"]').empty()
}


function removeNotification(delay) {
    if (delay === 'false') {
        $('[data-element="notification"]').hide()
        cleanNotification()
    } else {
        setTimeout(function() {
            $('[data-element="notification"]').hide()
            cleanNotification()
        }, 3000)
    }
}

function open(response, customMessage) {
    this.notificationClass = {
        success: 'notification--success',
        warning: 'notification--warning',
        error: 'notification--error'
    }
    this.notification = $('[data-element="notification"]')
    this.notificationContent = $('[data-element="custom-response"]')

    this.notification.addClass('notification--' + response)
    this.notificationContent.html(customMessage)
    this.notification.show()
}

function close() {
    $('[data-behaviour="close-notification"]').on('click', function() {
        removeNotification('false')
    })
}

export default {
    open,
    close
}
