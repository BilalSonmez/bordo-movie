import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.list',
  validate: new SimpleSchema({
  }).validator(),
  run: function () {
    this.unblock();
    return Category.find({}).fetch();
  }
});