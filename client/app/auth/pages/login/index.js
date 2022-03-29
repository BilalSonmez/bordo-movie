import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.authPagesLogin.events({ 
  'submit #brd-signin': function(event, template) { 
    event.preventDefault();
    const emailAddress = event.target.brd_email.value;
    const password = event.target.brd_password.value;

    Meteor.loginWithPassword(emailAddress, password, function (error) {
      if (error) {
        ErrorHandler.show(error);
        return;
      }
      FlowRouter.go("public.home");
    });
  } 
});