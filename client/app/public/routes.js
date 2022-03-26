import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPagehome' });
  }
});