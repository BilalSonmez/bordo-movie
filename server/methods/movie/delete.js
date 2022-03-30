import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'movie.delete',
  mixins: [isAdmin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    Movie.remove({ _id: _id });
  }
});
