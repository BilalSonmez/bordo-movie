import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'comment.list',
  mixins: [isAdmin],
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options } = data;

    const comments = Fetch(Comments, {}, options, 'comments');
    comments.comments = comments.comments.map(_comment => {
      _comment._user_id = Meteor.users.findOne({
        _id: _comment._user_id
      });
      
      _comment._movie_id = Movie.findOne({
        _id: _comment._movie_id
      });

      return _comment;
    });
    return comments;
  }
});