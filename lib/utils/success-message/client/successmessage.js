import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';

SuccessMessage = {
  show: function (success) {
    let message;
    if (typeof success === 'string') {
      message = success;
    } else {
      return;
    }

    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    });
  },
};