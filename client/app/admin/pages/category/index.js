Template.adminPageCategory.onCreated(function () {
  this.state = new ReactiveDict(null, {
    
  });

});

Template.adminPageCategory.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get('category');

  });
});

Template.adminPageCategory.events({
  'click #event': function (event,template) {

  }
});