import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

const routesAdmin = FlowRouter.group({
  prefix: '/admin',
  name: 'admin',
  triggersEnter:[MustSignIn, IsAdmin]
});

routesAdmin.route('/dashboard', {
  name: 'admin.dashboard',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageDashboard' });
  }
});

routesAdmin.route('/category', {
  name: 'admin.category',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageCategory' });
  }
});
routesAdmin.route('/user', {
  name: 'admin.movie',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageUser' });
  }
});

routesAdmin.route('/comments', {
  name: 'admin.comments',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageComments' });
  }
});

routesAdmin.route('/movie', {
  name: 'admin.movie',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageMovie' });
  }
});

routesAdmin.route('/movie/add', {
  name: 'admin.movie.add',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageMovieAdd' });
  }
});

routesAdmin.route('/movie/edit/:_id', {
  name: 'admin.movie.edit',
  action: function (params, queryParams) {
    this.render('adminLayoutDefault', { page: 'adminPageMovieEdit' });
  }
});