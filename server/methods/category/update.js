import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.update',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    category: CategorySchema
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, category } = data

    const id = Category.update({ _id: _id }, {
      $set: category
    });

    return Category.findOne({ _id: id });
  }
});