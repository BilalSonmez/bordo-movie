import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.adminComponentNavbar.events({
  'click .btn-logout': function(event, template) { 
    event.preventDefault();
    Meteor.logout(function () {
      FlowRouter.go('/');
    });
  } 
});