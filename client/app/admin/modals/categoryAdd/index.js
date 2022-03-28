import bootstrap from "bootstrap";
import Quill from "quill";

Template.adminModalCategoryCreate.onRendered(function () {
  const self = this;
  self.quill = new Quill("#editor-container", {
    theme: "snow",
  });
  const modalElement = document.getElementById("brdadminModalCategoryCreate");
  this.modal = new bootstrap.Modal(modalElement);

  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("#brdCategoryCreateForm").trigger("reset");
  });
});

Template.adminModalCategoryCreate.events({
  "submit form#brdCategoryCreateForm": function (event, template) {
    event.preventDefault();

    const name = event.target.name.value;
    const description = template.quill.root.innerHTML;

    const obj = {
      category: {
        title: name,
        description: description,
      },
    };

    LoadingLine.show();
    Meteor.call("category.create", obj, function (error, success) {
      LoadingLine.hide();

      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      SuccessMessage.show("Kategori başarıyla oluşturuldu.");
      AppUtil.refreshTokens.set("category", Random.id());
      event.target.reset();
      template.modal.hide();
    });
  },
});
