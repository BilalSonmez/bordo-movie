import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicPagesCategoryDetail.onCreated(function(){
  this.state = new ReactiveDict(null, {
    category_id: FlowRouter.getParam("_id"),
    category: {}
  });
});

Template.publicPagesCategoryDetail.onRendered(function () {
  const self = this;
  const _id = FlowRouter.getParam("_id");
  this.autorun(function() {
    Meteor.call('category.show', {_id: _id}, function (error, result) {
        if (error) {
            ErrorHandler.show(error)
            return;
        }
        self.state.set('category', result);
        AppUtil.refreshTokens.set('category', Random.id());
    });
  });
});