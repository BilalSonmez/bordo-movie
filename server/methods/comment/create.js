import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'comment.create',
  mixins: [SignedInMixin],
  validate: new SimpleSchema({
    comment: CommentSchema.omit('approve')
  }).validator(),
  run: function(data){
    this.unblock();
    const { comment } = data;
    comment.approve = false;
    const id = Comments.insert(comment);
    return Comments.findOne({ _id: id});
  }
});