import SimpleSchema from 'simpl-schema';

Category = new Mongo.Collection('category');

CategorySchema = new SimpleSchema({
    title: String,
    description: String
});


Category.attachSchema(CategorySchema);
Category.softRemovable();
Category.autoDates();
Category.lastEditUser();
Category.createdUser();