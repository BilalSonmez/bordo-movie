Template.adminPageDashboard.onCreated(function () {
  this.state = new ReactiveDict(null, {
    category:Number,
    movie:Number,
    comment:Number,
    user:Number,
    view:Number,
  });

});

Template.adminPageDashboard.onRendered(function () {
  const self = this;
  this.autorun(function () {
    Meteor.call("category.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("category", result.category.length);
    });
    Meteor.call("movie.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("movie", result.movie.length);
      let counter=0;
      console.log(result.movie);
      result.movie.forEach(function (data){
        counter += data.views;
      })
      self.state.set("view", counter);
    });
    Meteor.call("comment.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("comment", result.comments.length);
    });
    Meteor.call("user.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("user", result.user.length);
    });
  });
});

Template.adminPageDashboard.events({
  'click #event': function (event,template) {

  }
});