import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicPagesCategoryDetail.onCreated(function(){
  this.state = new ReactiveDict(null, {
    movies: {
      movie: [],
      options: fetchOptionSetup(12, "title", "asc")
    },
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

  this.autorun(function() {
    AppUtil.refreshTokens.get('category');
    const movie_data = self.state.get('movies');
    const category_data = self.state.get('category');
    const obj = {
      options: {
        pagination: {
          currentPage: movie_data.options.pagination.currentPage,
          pageItems: movie_data.options.pagination.pageItems
        },
        filtering: {
          category_id: category_data._id
        },
        sorting: movie_data.options.sorting
      }
    };

    Meteor.call('movie.list', obj, function (error, result) {
  
      if (error) {
        ErrorHandler.show(error)
        return;
      }
      self.state.set('movies', result);
      AppUtil.refreshTokens.set('movies', Random.id());
    });
  });
});