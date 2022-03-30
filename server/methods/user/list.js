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
    let usersData = Fetch(Meteor.users, {}, options, 'user');
    let userPermissions=[];
    usersData.user.forEach(element => {
      userPermissions.push({
        id:element._id,
        isAdmin: Roles.userIsInRole(element._id, 'roles.admin', null),
      });
    });
    usersData.userPermissions=userPermissions;
    return usersData;

  }
});