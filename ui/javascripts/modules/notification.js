export default class Notification {
    constructor(props) {
        this.notificationClass = {
            success: 'notification--success',
            warning: 'notification--warning',
            error: 'notification--error'
        }
        this.notification = $('[data-element="notification"]')
        this.notificationContent = $('[data-element="custom-response"]')
    }
    notification(response, customMessage) {
        if (response === 'success') {
            // $notificationContent.html(customMessage);
            // $notification.show();
            // $notification.addClass(notificationClass.success);
            // removeNotification()
        } else if (response === 'warning') {
            // $notificationContent.html(customMessage);
            // $notification.show();
            // $notification.addClass(notificationClass.warning);
        } else if (response === 'error') {
            // $notificationContent.html(customMessage);
            // $notification.show();
            // $notification.addClass(notificationClass.error);
        }
    }
}

// // Simple implimentation
// // On click of a button or other element with [data-behaviour="notification] show the notification.
// $('[data-behaviour="notification"]').on('click', function() {
//   // For this example we're passing 'success' to the notification function as well as a custom message.
//   notification('success', 'You clicked the button!');
// });
//
// // A cross inside the notification will close it when clicked
// $('[data-behaviour="close-notification"]').on('click', function(){
//   // Remove the notification, pass 'false' to disable the delay.
//   removeNotification('false');
// });
//
// // Notification function, accepts a response and custom message parameter.
// // eg: notification(response, customMessage);
// // function notification(response, customMessage) {
// //   if(response === 'success') {
// //     $notificationContent.html(customMessage);
// //     $notification.show();
// //     $notification.addClass(notificationClass.success);
// //     removeNotification()
// //   } else if (response === 'warning') {
// //     $notificationContent.html(customMessage);
// //     $notification.show();
// //     $notification.addClass(notificationClass.warning);
// //   } else if (response === 'error') {
// //     $notificationContent.html(customMessage);
// //     $notification.show();
// //     $notification.addClass(notificationClass.error);
// //   }
// // }
//
// function notification(response, customMessage) {
//   // Add the success class as deinfed in the array above.
//   $notification.addClass('notification--' + response);
//   // Change the content of the notification based on the customMessage parameter
//   $notificationContent.html(customMessage);
//   // Show on a successful response.
//   $notification.show();
//   // Depending on the response, do these things..
//   if(response === 'success') {
//     // Remove the notification after the success has shown.
//     removeNotification()
//   }
// }
//
// // Remove notification function
// function removeNotification(delay) {
//   // Check if anything has been passed to the delay parameter.
//   // If false, hide and clean the notification without any delay.
//   if (delay === 'false') {
//     // Once the timeout has expired hide the notification.
//     $notification.hide();
//     // After the notification is hidden, clean it.
//     cleanNotification();
//   } else {
//     // Set a timeout to hide the notification.
//     setTimeout(function(){
//       // Once the timeout has expired hide the notification.
//       $notification.hide();
//       // After the notification is hidden, clean it.
//       cleanNotification();
//       // Do it after 3 seconds.
//     }, 3000);
//   }
//
// }
//
// // Clean notification function
// function cleanNotification() {
//   // If there are styling classes or content in the notification element remove them so the element is clear for the next notifiation.
//
//   // Store the list of classes as 'addedClass'.
//   // 'Object.keys().length' not 'notificationClass.length' as objects don't have lengths.
//   // https://stackoverflow.com/questions/21552402/javascript-array-length-returns-undefined
//   var addedClass = Object.keys(notificationClass);
//   // Loop through the number of classes in the list
//   for (var i = 0; i < addedClass.length; i++) {
//     // Check if the notification element has a class that matches any in the list.
//     if ( $notification.hasClass('notification--' + addedClass[i]) ) {
//       // If there is a matching class, remove it.
//       $notification.removeClass('notification--' + addedClass[i]);
//       // Once it's been found and removed, stop the for loop.
//       break;
//     }
//   }
//
//   // Remove all content from the notification so new custom messages can be added.
//   $notificationContent.empty();
// }
//
// /////////////////
// // Testing only!!
// // A form which will send responses to the notification.
// $('[data-behaviour="form"]').on('submit', function(){
//   // The form doesn't do anything.
//   event.preventDefault();
//   // Check the value of the input to determine the error generated.
//   var val = $(this).find('input[type="text"]').val();
//   if (!val) {
//     // If the input is empty send an error response.
//     notification('error', 'Looks like the field is empty!');
//   } else if (isNaN(val)) {
//     // If the input contains text send a warning response.
//     notification('warning', 'Sorry, only numbers are allowed, please try again.');
//   } else {
//     // If the input contains numbers send a success response.
//     notification('success', 'Well done, you put numbers in the input!');
//   }
// });
//
//
// // Thoughts:
//
// // Maybe set up removeNotification() without the delay as the default option then pass it a parameter to initialise it. Currently it feels backwards.
