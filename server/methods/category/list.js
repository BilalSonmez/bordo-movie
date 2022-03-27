import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.list',
  //mixin admin kontrolü eklenecek.
  validate: new SimpleSchema({
  }).validator(),
  run: function () {
    this.unblock();
    return Category.find({}).fetch();
  }
});