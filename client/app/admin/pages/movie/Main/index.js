import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
Template.adminPageMovie.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    movies: [],
  });

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 10,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'asc'
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.adminPageMovie.onRendered(function () {
  const self = this;

  this.autorun(function () {
    Meteor.call("category.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("categories", result.category);
    });
  });
  this.autorun(function () {
    AppUtil.refreshTokens.get("movie");
    
    const listOptions = {
      options: {
        pagination: {
          currentPage: self.pagination.get("currentPage"),
          pageItems: self.pagination.get("pageItems"),
        },
        filtering: {},
        sorting: {
          sortField: self.sorting.get("sortField"),
          sortOrder: self.sorting.get("sortOrder"),
        }
      }
    };
    Meteor.call("movie.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("movies", result);
      self.pagination.set("totalCount",result.options.pagination.totalCount);
      const pages=Math.ceil(result.options.pagination.totalCount/result.options.pagination.pageItems)
      self.pagination.set("totalPages",pages);
      console.log(self.pagination.keys);
    });
  });
});

Template.adminPageMovie.events({
  'click .btnMovieAdd': function (event,template) {
    FlowRouter.go("admin.movie.add",{});
  },
  'click .btnMovieEdit': function (event,template) {
    FlowRouter.go("admin.movie.edit", {_id: this._id});
  },
  'click .btnMovieDelete': function (event,template) {
    event.preventDefault();
    const movie = this;
    Meteor.call(
      "movie.delete",
      {
        _id: movie._id,
      },
      function (error, result) {
        LoadingLine.hide();
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        AppUtil.refreshTokens.set("movie", Random.id());
      }
    );
  }
});