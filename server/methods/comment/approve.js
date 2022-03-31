import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'comment.approve',
  mixins: [isAdmin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
    approve: Boolean
  }).validator(),
  run: function (data) {
    this.unblock();
    const { _id, approve } = data

    const id = Comments.update({ _id: _id }, {
      $set: {
        approve: approve
      }
    });

    return Comments.findOne({ _id: id });
  }
});