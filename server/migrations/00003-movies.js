Migrations.add({
  version: 3,
  name: 'Created Movie',
  up: function () {
    const movies = JSON.parse(Assets.getText('movies.json'));
    movies.forEach(movie => {
      Movie.insert(movie);
    });
  }
});