import bootstrap from "bootstrap";
import Quill from "quill";


Template.adminModalCategoryEdit.onRendered(function () {
  const self = this;
  self.quill = new Quill('#edit-editor-container', {
    theme: 'snow',
  });
  this.autorun(function () {
    AppUtil.refreshTokens.get("category");
    if (Session.get("editData")) {
      self.quill.root.innerHTML=Session.get("editData").description;
      $("input#brdadminModalCategoryEdit_name").val(Session.get("editData").title);
    }
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
    const description = template.quill.root.innerHTML;
    console.log(description);
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
