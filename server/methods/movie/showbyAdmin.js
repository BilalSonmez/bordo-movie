import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'movie.show.admin',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    let movie = Movie.findOne({
      _id: _id
    });
    return movie;
  }
});


