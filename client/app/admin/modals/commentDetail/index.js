import bootstrap from "bootstrap";

Template.adminModalCommentDetail.onRendered(function () {
  const self = this;
  this.autorun(function () {
    AppUtil.refreshTokens.get("category");
    const showData = Session.get("editData")
    if (showData) {
      $('#commentUserName').val(showData._user_id.profile.name);
      $('#commentUserLastName').val(showData._user_id.profile.lastName);
      $('#commentUserEmail').val(showData._user_id.emails[0].address);
      $('#commentMessage').html(showData.comment);
      $('#commentMovieLink').attr('href', '/movie/'+showData._movie_id._id);
    }
  });

  const modalElement = document.getElementById("brdadminModalCommentDetail");
  this.modal = new bootstrap.Modal(modalElement);
  modalElement.addEventListener("hidden.bs.modal", function (event) {
    self.$("#brdCategoryEditForm").trigger("reset");
  });
});

Template.adminModalCommentDetail.events({
  "click .btnApprove": function (event, template) {
    event.preventDefault();
    const id = Session.get("editData")._id;
    const obj = {
      _id: id,
      approve: event.target.value === "true" ? true : false
    };

    Meteor.call("comment.approve", obj, function (error, success) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }

      SuccessMessage.show("Comment başarıyla düzenlendi.");
      AppUtil.refreshTokens.set("comments", Random.id());
      event.target.reset();
      template.modal.hide();
    });
  },
});

Template.adminModalCommentDetail.helpers({});
