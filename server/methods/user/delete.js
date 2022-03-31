import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'user.delete',
  mixins: [isAdmin],
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;
    return Meteor.users.remove({ _id: _id });
  }
});
