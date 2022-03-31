Template.publicPagesHome.onCreated(function(){
  this.state = new ReactiveDict(null, {
    category: [],
    topMovie: {
      movie: [],
      options: fetchOptionSetup(9, "views")
    },
    recentMovie: {
      movie: [],
      options: fetchOptionSetup(10)
    },
    tags: []
  });
});



Template.publicPagesHome.onRendered(function () {
  const self = this;
  this.autorun(function() {
    const movie_data = self.state.get('topMovie');

    const obj = {
      options: {
        pagination: {
          currentPage: movie_data.options.pagination.currentPage,
          pageItems: movie_data.options.pagination.pageItems
        },
        filtering: movie_data.options.filtering,
        sorting: movie_data.options.sorting
      }
    };

    Meteor.call('movie.list', obj, function (error, result) {
      LoadingLine.hide()
  
      if (error) {
        ErrorHandler.show(error)
        return;
      }
      self.state.set('topMovie', result);
      AppUtil.refreshTokens.set('topMovie', Random.id());
    });
  });


  this.autorun(function() {
    const movie_data = self.state.get('recentMovie');

    const obj = {
      options: {
        pagination: {
          currentPage: movie_data.options.pagination.currentPage,
          pageItems: movie_data.options.pagination.pageItems
        },
        filtering: movie_data.options.filtering,
        sorting: movie_data.options.sorting
      }
    };

    Meteor.call('movie.list', obj, function (error, result) {
      LoadingLine.hide()
  
      if (error) {
        ErrorHandler.show(error)
        return;
      }
      self.state.set('recentMovie', result);
      AppUtil.refreshTokens.set('recentMovie', Random.id());
    });
  });

  this.autorun(function() {
    Meteor.call('category.list', {}, function(error, result) { 
      if (error) { 
        console.log('error', error); 
        return
      }
      self.state.set('category', result.category);
    });
  });


  this.autorun(function() {
    const tags_data = self.state.get('tags');

    Meteor.call('tags.list', {}, function (error, result) {
      LoadingLine.hide()
  
      if (error) {
        ErrorHandler.show(error)
        return;
      }
      self.state.set('tags', result);
      console.log(result);
      AppUtil.refreshTokens.set('tags', Random.id());
    });
  });
});