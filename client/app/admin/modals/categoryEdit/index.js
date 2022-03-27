import bootstrap from "bootstrap";

Template.adminModalCategoryEdit.onRendered(function () {
  const self = this;
  this.autorun(function () {
    AppUtil.refreshTokens.get("editCategory");
    $("input#brdadminModalCategoryEdit_name").val(Session.get("editData").title);
    $("textarea#brdadminModalCategoryEdit_description").val(Session.get("editData").description);
  });

  const modalElement = document.getElementById("brdadminModalCategoryEdit");
  this.modal = new bootstrap.Modal(modalElement);
  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("#brdCategoryEditForm").trigger("reset");
  });
});

Template.adminModalCategoryEdit.events({
  "submit form#brdCategoryEditForm": function (event, template) {
    event.preventDefault();
    const id = Session.get("editData")._id;
    const name = event.target.name.value;
    const description = event.target.description.value;
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
      AppUtil.refreshTokens.set("category", Random.id());
      event.target.reset();
      template.modal.hide();
    });
  },
});

Template.adminModalCategoryEdit.helpers({});
