import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'movie.update',
  mixins: [isAdmin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    movie: MovieSchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, movie } = data

    const id = Movie.update({ _id: _id }, {
      $set: movie
    });

    return Movie.findOne({ _id: id });
  }
});