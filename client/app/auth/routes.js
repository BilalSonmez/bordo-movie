import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

const routesAuth = FlowRouter.group({
  prefix: '/auth',
  name: 'auth',
  triggersEnter:[MustSignOut],
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

FlowRouter.route('/profile', {
  name: 'profile.main',
  triggersEnter:[MustSignIn],
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'authPagesProfile', link: 'profile' });
  }
})