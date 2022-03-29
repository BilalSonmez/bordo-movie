import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'movie.show.category',
  validate: new SimpleSchema({
    category_id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { category_id } = data;

    return Movie.findOne({
      category_id: category_id
    });
  }
});


