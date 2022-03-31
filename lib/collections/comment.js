import SimpleSchema from 'simpl-schema';

Comments = new Mongo.Collection('comments');

CommentSchema = new SimpleSchema({
    _user_id: SimpleSchema.RegEx.Id,
    _movie_id: SimpleSchema.RegEx.Id,
    comment: String,
    approve: {
        type: Boolean,
        defaultValue: false,
        optional: true
    },
});


Comments.attachSchema(CommentSchema);
Comments.softRemovable();
Comments.autoDates();
Comments.lastEditUser();
Comments.createdUser();