import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.authPagesProfile.helpers({
  logConsole: function(data) {
    console.log(data);
  }
});