import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'user.list',
  mixins: [isAdmin],
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options } = data;
    const result = Fetch(Meteor.users, {}, options, 'user');
    const userPermissions = [];

    result.user.forEach(element => { // TODO:
      userPermissions.push({
        id: element._id,
        isAdmin: Roles.userIsInRole(element._id, 'roles.admin', null),
      });
    });

    result.userPermissions = userPermissions;
    return result;

  }
});