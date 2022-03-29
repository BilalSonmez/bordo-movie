Template.adminPageCategory.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
  });
});

Template.adminPageCategory.onRendered(function () {
  const self = this;
  this.autorun(function () {
    AppUtil.refreshTokens.get("category");
    const obj = {
      options: {
        pagination: {
          currentPage: 1,
          pageItems: 10
        },
        filtering: {},
        sorting: {
          sortField: 'createdAt',
          sortOrder: 'asc'
        }
      }
    };
    Meteor.call("category.list", obj, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      console.log(result);
      self.state.set("categories", result);
    });
  });
});

Template.adminPageCategory.events({
  "click .categortEdit": function () {
    Session.set("editData", this);
    console.log(Session.get("editData"));
    AppUtil.refreshTokens.set("category", Random.id());
  },
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
  },
});

Template.adminPageCategory.onDestroyed(function () {
  Session.set("editData", undefined);
  console.log(Session.get("editData"));
});
