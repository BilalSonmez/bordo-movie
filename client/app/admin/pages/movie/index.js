import Quill from "quill";
import Tagify from '@yaireo/tagify';



Template.adminPageMovie.onCreated(function () {
  this.state = new ReactiveDict(null, {
    categories: [],
    movie: [],
    posters: [],
  });
});

Template.adminPageMovie.onRendered(function () {
  const self = this;

  // Tagify hazır çalışır durumda. veri işlenmesi gerekiyor.
  // var inputElm = document.querySelector("#inputTags"),
  // tagify = new Tagify (inputElm);



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
    
    if (imdbId=="") {
      ErrorHandler.show("Lütfen imdb idsini giriniz.");
      return;
    }
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch("https://imdb-api.com/en/API/Title/k_3axgnwfu/" + String(imdbId), requestOptions)
      .then((response) => response.text())
      .then((result) => template.state.set("movie", JSON.parse(result)))
      .catch((error) => ErrorHandler.show("Apiden veri çekerken bir hatayla karşılaşıldı."));

    fetch("https://imdb-api.com/en/API/Images/k_3axgnwfu/" + String(imdbId) +"/Short", requestOptions)
      .then((response) => response.text())
      .then((result) => template.state.set("posters", JSON.parse(result)))
      .catch((error) => ErrorHandler.show("Apiden veri çekerken bir hatayla karşılaşıldı."));

    event.target.reset();
    AppUtil.refreshTokens.set("movie");

  },
  "submit form#brdMovieCreateForm": function(event, template){
    event.preventDefault();
    const title = event.target.inputTitle.value;
    const category_id = event.target.inputCategory.value;
    const imdb_id = template.state.get("movie").id;
    const description = template.quill.root.innerHTML;
    const cover_url =  event.target.inputCoverUrl.value;
    const views = Number(event.target.inputViews.value);
    const posterdata =template.state.get("posters").items;
    let posters = [];
    for (let index = 0; index < posterdata.length; index++) {
      posters.push(posterdata[index].image);
    }
    //tags düzeltilecek tagify datası düzeltildikten sonra.
    const tags = event.target.inputTags.value.split(',');
    
    const obj = {
      movie:{
        title:title,
        category_id:category_id,
        imdb_id:imdb_id,
        description:description,
        cover_url:cover_url,
        views:views,
        posters:posters,
        tags:tags,
      }
    }

    LoadingLine.show();
    Meteor.call("movie.create", obj, function (error, success) {
      LoadingLine.hide();

      if (error) {
        ErrorHandler.show(error.message);
        return;
      }
      SuccessMessage.show("Film başarıyla oluşturuldu.");
      template.state.set("movie",{});
      template.state.set("posters",{});
      AppUtil.refreshTokens.set("movie", Random.id());
      event.target.reset();
    });

  }
});
