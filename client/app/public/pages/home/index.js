Template.publicPagesHome.onCreated(function(){
  this.state = new ReactiveDict(null, {
    category: []
  });
});



Template.publicPagesHome.onRendered(function () {
  const self = this;
  this.autorun(function() {
    Meteor.call('category.list', {}, function(error, success) { 
      if (error) { 
        console.log('error', error); 
        return
      }
      self.state.set('category', success);
    });
  });
});