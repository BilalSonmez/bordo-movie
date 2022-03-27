import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPagesHome', link: 'public.home' });
  }
});
FlowRouter.route('/about', {
  name: 'public.about',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPagesAbout', link: 'public.about' });
  }
});
FlowRouter.route('/contact', {
  name: 'public.contact',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPagesContact', link: 'public.contact' });
  }
});
FlowRouter.route('/category', {
  name: 'public.category',
  action: function (params, queryParams) {
    this.render('publicLayoutDefault', { page: 'publicPagesCategory', link: 'public.category' });
  }
});