import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.delete',
  //admin kontrolü
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    Category.remove({ _id: _id });
  }
});
