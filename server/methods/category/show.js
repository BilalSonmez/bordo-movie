import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.show',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    return Category.findOne({
      _id: _id
    });
  }
});


