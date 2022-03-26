import bootstrap from "bootstrap";

Template.adminModalCategoryCreate.onRendered(function () {
  const self = this;

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
    const description = event.target.description.value;

    const obj = {
      category: {
        title: name,
        description: description,
      },
    };

    LoadingLine.show();
    Meteor.call('category.create', obj, function (error, success) {
      LoadingLine.hide();

      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      SuccessMessage.show('Kategori başarıyla oluşturuldu.');
      AppUtil.refreshTokens.set('category', Random.id());
      event.target.reset();
      template.modal.hide();
    });
  },
});
