import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
Template.authPagesRegister.events({ 
  'submit #brd-signup': function(event, template) { 
    event.preventDefault();
    const name = event.target.brd_name.value;
    const surname = event.target.brd_surname.value;
    const emailAddress = event.target.brd_email.value;
    const password = event.target.brd_password.value;

    const obj = {
      email: emailAddress,
      password: password,
      profile: {
        name: name,
        lastName: surname
      }
    };

    Accounts.createUser(obj, function (error, result) {
      if (error) {
        LoadingSection.hide(template, '.authPageSignUp');
        ErrorHandler.show(error);
        return;
      }
      FlowRouter.go('public.home');
    });
  } 
});