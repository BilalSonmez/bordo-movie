import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Quill from "quill";
import Tagify from "@yaireo/tagify";

Template.adminPageMovieEdit.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    movieInfo: [],
    movie: [],
  });
});

Template.adminPageMovieEdit.onRendered(function () {
  const self = this;
  const _id = FlowRouter.getParam("_id");
  self.quill = new Quill("#edit-movie-editor", {
    theme: "snow",
  });
  var inputElm = document.querySelector("#editInputTags"),
  tagify = new Tagify(inputElm);
  
  this.autorun(function () {
    AppUtil.refreshTokens.get("movieEdit");
    Meteor.call("movie.show", {_id: _id}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("movieInfo", result);
    });
    tagify.addTags(self.state.get("movieInfo").tags); 
    self.quill.root.innerHTML=self.state.get("movieInfo").description;
  }),

  this.autorun(function () {
    Meteor.call("category.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("categories", result.category);
    });
  });
});

Template.adminPageMovieEdit.events({
  "submit form#brdMovieEditForm": function (event, template) {
    event.preventDefault();
    const _id=FlowRouter.getParam("_id");
    const title = event.target.inputTitle.value;
    const category_id = event.target.inputCategory.value;
    const imdb_id = template.state.get("movieInfo").imdb_id;
    const description = template.quill.root.innerHTML;
    const cover_url = event.target.inputCoverUrl.value;
    const trailer_link = event.target.inputTrailer.value;
    const views = Number(event.target.inputViews.value);
    const posters = template.state.get("movieInfo").posters;
    const rawTags = JSON.parse(event.target.editInputTags.value);
    let tags =[];
    rawTags.forEach(element => {
      tags.push(element.value);
    });

    const obj = {
      _id: _id,
      movie: {
        title: title,
        category_id: category_id,
        imdb_id: imdb_id,
        description: description,
        cover_url: cover_url,
        views: views,
        trailer_link: trailer_link,
        posters: posters,
        tags: tags,
      },
    };

    LoadingLine.show();
    Meteor.call("movie.update", obj, function (error, success) {
      LoadingLine.hide();

      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      SuccessMessage.show("Film başarıyla gücellendi.");
      AppUtil.refreshTokens.set("movieEdit", Random.id());
      FlowRouter.go("admin.movie", {});
    });
  },
});
