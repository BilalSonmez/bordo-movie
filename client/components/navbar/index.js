import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.componentsNavbar.events({ 
  'click .brd-btn-logout': function(event, template) { 
    event.preventDefault();
    Meteor.logout(function () {
      FlowRouter.go('/');
    });
  } 
});