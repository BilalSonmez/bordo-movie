Template.publicPagesCategory.onCreated(function(){
  this.state = new ReactiveDict(null, {
    category: {
      category: [],
      options: fetchOptionSetup(12, "title", "asc")
    }
  });
});

Template.publicPagesCategory.onRendered(function () {
  const self = this;
  this.autorun(function() {
    const category_data = self.state.get('category');
    const obj = {
      options: {
        pagination: {
          currentPage: category_data.options.pagination.currentPage,
          pageItems: category_data.options.pagination.pageItems
        },
        filtering: category_data.options.filtering,
        sorting: category_data.options.sorting
      }
    };

    Meteor.call('category.list.poster', obj, function (error, result) {
  
      if (error) {
        ErrorHandler.show(error)
        return;
      }

      self.state.set('category', result);
    });
  });
});