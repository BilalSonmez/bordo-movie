import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.create',
  mixins: [isAdmin],
  validate: new SimpleSchema({
    category: CategorySchema
  }).validator(),
  run: function(data){
    this.unblock();
    const { category } = data
    const id = Category.insert(category);
    return Category.findOne({ _id: id});
  }
});