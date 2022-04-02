import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicPagesCategoryDetail.onCreated(function () {
  this.state = new ReactiveDict(null, {
    category: null
  });
});

Template.publicPagesCategoryDetail.onRendered(function () {
  const self = this;

  this.autorun(function () {
    const _id = FlowRouter.getParam("_id");

    if (!_id) {
      return;
    }

    Meteor.call('category.show', { _id: _id }, function (error, result) {
      if (error) {
        ErrorHandler.show(error)
        return;
      }

      self.state.set('category', result);
      AppUtil.refreshTokens.set('category', Random.id());
    });
  });
});