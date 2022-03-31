Template.adminPageComments.onCreated(function () {
  this.state = new ReactiveDict(null, {
    comments: [],
  });
  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 10,
    totalCount: 0,
    totalPages: 0
  });

  this.sorting = new ReactiveDict(null, {
    sortField: 'createdAt',
    sortOrder: 'desc'
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.adminPageComments.onRendered(function () {
  const self = this;
  this.autorun(function () {
    AppUtil.refreshTokens.get("comments");
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
    Meteor.call("comment.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.pagination.set("totalCount",result.options.pagination.totalCount);
      const pages=Math.ceil(result.options.pagination.totalCount/result.options.pagination.pageItems)
      self.pagination.set("totalPages",pages);
      console.log(result);
      self.state.set("comments", result);
    });
  });
});

Template.adminPageComments.events({
  "click .commentShow": function () {
    console.log(this);
    Session.set("editData", this);
    console.log(Session.get("editData"));
    AppUtil.refreshTokens.set("comments", Random.id());
  },/*
  "click .categortDelete": function (event, template) {
    event.preventDefault();
    const category = this;
    Meteor.call(
      "category.delete",
      {
        _id: category._id,
      },
      function (error, result) {
        LoadingLine.hide();
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        AppUtil.refreshTokens.set("category", Random.id());
      }
    );
  },*/
});

Template.adminPageComments.onDestroyed(function () {
  Session.set("editData", undefined);
  console.log(Session.get("editData"));
});
