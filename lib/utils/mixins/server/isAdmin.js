isAdmin = function (methodOptions) {
  const runFunc = methodOptions.run;

  methodOptions.run = function (_data) {
    const userId = this.userId;
    if (!userId) {
      throw (new Meteor.Error("Kullanıcı girişi yapınız."));
    }else if(!Roles.userIsInRole(userId, 'roles.admin', null)){
      throw (new Meteor.Error("Yetersiz yetki."));
    }
    return runFunc.call(this, ...arguments);
  };
  return methodOptions;
};