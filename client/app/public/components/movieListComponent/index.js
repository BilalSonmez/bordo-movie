Template.publicComponentsMovieList.onCreated(function () {
  const { pageItem, sortArea, sortType, categoryID, tag } = this.data;

  this.state = new ReactiveDict(null, {
    movies: [],
  });

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: pageItem,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: sortArea,
    sortOrder: sortType
  });

  let filters = {};
  if (categoryID) {
    filters.category_id = categoryID;
  }

  if (tag) {
    filters.tags = { $in: [tag] };
  }

  this.filtering = new ReactiveDict(null, filters);
});

Template.publicComponentsMovieList.onRendered(function () {
  const self = this;
  this.autorun(function () {

    const obj = {
      options: {
        pagination: {
          currentPage: self.pagination.get("currentPage"),
          pageItems: self.pagination.get("pageItems"),
        },
        filtering: self.filtering.all(),
        sorting: self.sorting.all()
      }
    };

    LoadingLine.show();
    Meteor.call('movie.list', obj, function (error, result) {
      LoadingLine.hide()

      if (error) {
        ErrorHandler.show(error)
        return;
      }

      self.state.set('movies', result.movie);
      self.pagination.set('currentPage', result.options.pagination.currentPage);
      self.pagination.set('pageItems', result.options.pagination.pageItems);
      self.pagination.set('totalCount', result.options.pagination.totalCount);
      self.pagination.set('totalPages', result.options.pagination.totalPages);
    });
  });
});