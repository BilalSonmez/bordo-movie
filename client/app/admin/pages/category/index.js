Template.adminPageCategory.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
  });
});

Template.adminPageCategory.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("category");
    Meteor.call("category.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("categories", result);
    });
  });
});

Template.adminPageCategory.events({
  "click .categortEdit": function () {
    Session.set("editData", this);
    AppUtil.refreshTokens.set("editCategory", Random.id());
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
