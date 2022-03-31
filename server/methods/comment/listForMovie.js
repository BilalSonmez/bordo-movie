import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'comment.list.movie',
  validate: new SimpleSchema({
    movie_id: SimpleSchema.RegEx.Id,
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options, movie_id} = data;

    const comments = Fetch(Comments, {_movie_id: movie_id, approve: true}, options, 'comments');
    comments.comments = comments.comments.map(_comment => {
      _comment._user_id = Meteor.users.findOne({
        _id: _comment._user_id
      });

      return _comment;
    });
    return comments;
  }
});