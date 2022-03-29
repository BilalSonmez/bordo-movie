Migrations.add({
  version: 1,
  name: 'Created role and default admin account.',
  up: function () {
    Roles.createRole('roles.admin');

    const userId = Accounts.createUser({
      email: 'admin@bordomovie.com',
      password: '123123',
      profile: {
        name: 'Bordo',
        lastName: 'Admin',
        isAdmin: true
      }
    });

    Roles.addUsersToRoles(userId, 'roles.admin', null);
  }
});