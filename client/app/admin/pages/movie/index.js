import Quill from "quill";
import Tagify from "@yaireo/tagify";

Template.adminPageMovie.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    movie: [],
    trailer: [],
  });
});

Template.adminPageMovie.onRendered(function () {
  const self = this;

  // Tagify hazır çalışır durumda. veri işlenmesi gerekiyor.
    var inputElm = document.querySelector("#inputTags"),
    tagify = new Tagify(inputElm);
    //tagify.addTags(["banana", "orange", "apple"]);

  self.quill = new Quill("#movie-editor", {
    theme: "snow",
  });
  this.autorun(function () {
    AppUtil.refreshTokens.get("movie");
    Meteor.call("category.list", {}, function (error, result) {
      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      self.state.set("categories", result);
    });
  });
});

Template.adminPageMovie.events({
  "submit form#brdMovieDataCreateForm": function (event, template) {
    event.preventDefault();
    const imdbId = event.target.movieInputId.value;
    if (imdbId == "") {
      ErrorHandler.show("Lütfen imdb idsini giriniz.");
      return;
    }
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("https://imdb-api.com/en/API/Posters/k_3axgnwfu/" + String(imdbId), requestOptions)
      .then((response) => response.text())
      .then((result) => template.state.set("movie", JSON.parse(result)))
      .catch((error) => ErrorHandler.show("Apiden veri çekerken bir hatayla karşılaşıldı."));

    fetch("https://imdb-api.com/en/API/Trailer/k_3axgnwfu/" + String(imdbId), requestOptions)
      .then((response) => response.text())
      .then((result) => template.state.set("trailer", JSON.parse(result)))
      .catch((error) => ErrorHandler.show("Apiden veri çekerken bir hatayla karşılaşıldı."));

    event.target.reset();
    AppUtil.refreshTokens.set("movie");
  },
  "submit form#brdMovieCreateForm": function (event, template) {
    event.preventDefault();
    const title = event.target.inputTitle.value;
    const category_id = event.target.inputCategory.value;
    const imdb_id = template.state.get("movie").imDbId;
    const description = template.quill.root.innerHTML;
    const cover_url = event.target.inputCoverUrl.value;
    const trailer_link = event.target.inputTrailer.value;
    const views = Number(event.target.inputViews.value);
    const posterdata = template.state.get("movie").backdrops;
    let posters = [];
    for (let index = 0; index < posterdata.length; index++) {
      posters.push(posterdata[index].link);
    }
    const rawTags = JSON.parse(event.target.inputTags.value);
    let tags =[];
    rawTags.forEach(element => {
      tags.push(element.value);
    });
   
    const obj = {
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
    Meteor.call("movie.create", obj, function (error, success) {
      LoadingLine.hide();

      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      SuccessMessage.show("Film başarıyla oluşturuldu.");
      template.state.set("movie", {});
      template.state.set("posters", {});
      AppUtil.refreshTokens.set("movie", Random.id());
      event.target.reset();
      template.quill.root.innerHTML="";
    });
  },
});
