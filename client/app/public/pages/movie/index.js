import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicPagesMovie.onCreated(function(){
  this.state = new ReactiveDict(null, {
    movie: {},
    category: {}
  });
});

Template.publicPagesMovie.onRendered(function () {
  const self = this;
  const _id = FlowRouter.getParam("_id");
  this.autorun(function() {
    Meteor.call('movie.show', {_id: _id}, function (error, result) {
        if (error) {
            ErrorHandler.show(error)
            return;
        }
        self.state.set('movie', result);
        AppUtil.refreshTokens.set('movie', Random.id());
    });
  });
});