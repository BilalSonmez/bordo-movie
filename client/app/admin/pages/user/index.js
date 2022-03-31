import { FlowRouter } from "meteor/ostrio:flow-router-extra";
Template.adminPageUser.onCreated(function () {
  this.state = new ReactiveDict(null, {
    users: [],
    usersPermissions: [],
  });

  this.pagination = new ReactiveDict(null, {
    currentPage: 1,
    pageItems: 10,
    totalCount: 0,
    totalPages: 0,
  });

  this.sorting = new ReactiveDict(null, {
    sortField: "createdAt",
    sortOrder: "asc",
  });

  this.filtering = new ReactiveDict(null, {});
});

Template.adminPageUser.onRendered(function () {
  const self = this;
  this.autorun(function () {
    AppUtil.refreshTokens.get("user");

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
        },
      },
    };
    Meteor.call("user.list", listOptions, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("users", result);
      self.pagination.set("totalCount", result.options.pagination.totalCount);
      const pages = Math.ceil(result.options.pagination.totalCount / result.options.pagination.pageItems);
      self.pagination.set("totalPages", pages);
    });
  });

  

});

Template.adminPageUser.events({
  "click .btnUserDelete": function (event, template) {
    event.preventDefault();
    const user = this;
    Meteor.call(
      "user.delete",{_id: user._id,},
      function (error, result) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        console.log(result);
        AppUtil.refreshTokens.set("user", Random.id());
      }
    );
  },
  "click .btnSetRole": function (event, template) {
    event.preventDefault();
    const user = this;
    console.log(user);
    Meteor.call(
      "role.set",{_id: user.id,},
      function (error, result) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        console.log(result);
        AppUtil.refreshTokens.set("user", Random.id());
      }
    );
  },
  "click .btnCancelRole": function (event, template) {
    event.preventDefault();
    const user = this;
    console.log(user);
    Meteor.call(
      "role.cancel",{_id: user.id,},
      function (error, result) {
        if (error) {
          ErrorHandler.show(error.message);
          return;
        }
        console.log(result);
        AppUtil.refreshTokens.set("user", Random.id());
      }
    );
  },
});
