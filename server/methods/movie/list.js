import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'movie.list',
  validate: new SimpleSchema({
  }).validator(),
  run: function () {
    this.unblock();
    return Movie.find({}).fetch();
  }
});