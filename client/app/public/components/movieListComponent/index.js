Template.publicComponentsMovieList.onCreated(function(){
  this.state = new ReactiveDict(null, {
    movies: [],
  });

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: this.data.pageItem,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: this.data.sortArea,
    sortOrder: this.data.sortType
  });
  
  let filters = {};
  if (this.data.categoryID)
    filters.category_id = this.data.categoryID;
  
  if (this.data.tag) {
    filters.tags = {$in: [this.data.tag]};
  }

  this.filtering = new ReactiveDict(null, filters);
});



Template.publicComponentsMovieList.onRendered(function () {
  const self = this;
  this.autorun(function() {

    const obj = {
      options: {
        pagination: {
          currentPage: self.pagination.get("currentPage"),
          pageItems: self.pagination.get("pageItems"),
        },
        filtering: self.filtering.all(),
        sorting: {
          sortField: self.sorting.get("sortField"),
          sortOrder: self.sorting.get("sortOrder"),
        }
      }
    };

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