import bootstrap from "bootstrap";


Template.adminModalUserEdit.onRendered(function () {
  const self = this;

  this.autorun(function () {
    AppUtil.refreshTokens.get("user");
    console.log(Session.get("editUser"));
    if (Session.get("editUser")) {
      $("input#brdadminModalUserEdit_name").val(Session.get("editUser").profile.name);
      $("input#brdadminModalUserEdit_lastName").val(Session.get("editUser").profile.lastName);
      $("input#brdadminModalUserEdit_email").val(Session.get("editUser").emails[0].address);

    }
  });

  const modalElement = document.getElementById("brdadminModalUserEdit");
  this.modal = new bootstrap.Modal(modalElement);
  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("#brdUserEditForm").trigger("reset");
  });
});

Template.adminModalUserEdit.events({
  "submit form#brdCategoryEditForm": function (event, template) {
    event.preventDefault();
    const id = Session.get("editData")._id;
    const name = event.target.name.value;
    const description = template.quill.root.innerHTML;
    const obj = {
      _id: id,
      category: {
        title: name,
        description: description,
      },
    };

    Meteor.call("category.update", obj, function (error, success) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }

      SuccessMessage.show("Kategori başarıyla düzenlendi.");
      AppUtil.refreshTokens.set("user", Random.id());
      event.target.reset();
      template.modal.hide();
    });
  },
});

Template.adminModalUserEdit.helpers({});
