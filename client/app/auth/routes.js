import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

const routesAuth = FlowRouter.group({
  prefix: '/auth',
  name: 'auth',
  triggersEnter:[function () {
    Meteor.defer(function () {
      //$('body').css({"background-color":"#8D8DAA"});
    });      
  }], //[MustSignIn, IsAdmin] auth kısmı tamamlandıktan sonra aktif edilecek.
});

routesAuth.route('/signin', {
  name: 'auth.signin',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'authPagesLogin', link: 'auth' });
  }
});

routesAuth.route('/signup', {
  name: 'auth.signup',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'authPagesRegister', link: 'auth' });
  }
});