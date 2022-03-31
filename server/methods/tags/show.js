import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'tags.show',
  validate: new SimpleSchema({
    tagName: String,
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options, tagName } = data;

    return Fetch(Movie, {tags:[tagName]}, options, 'movies');
  }
});