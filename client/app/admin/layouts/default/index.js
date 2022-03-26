Template.adminLayoutDefault.onCreated(function () {
  this.state = new ReactiveDict(null, {
          
  });
});

Template.adminLayoutDefault.onRendered(function () {
  const self = this;

  this.autorun(function () {

  });
});

Template.adminLayoutDefault.events({
  'click #event': function (event,template) {

  }
});