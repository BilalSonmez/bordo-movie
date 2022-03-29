import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'movie.show',
  validate: new SimpleSchema({
    _id: SimpleSchema.RegEx.Id,
  }).validator(),
  run: async function (data) {
    this.unblock();
    const { _id } = data;

    let movie = Movie.findOne({
      _id: _id
    });
    Movie.update({_id: _id}, {$set:{
      views: movie.views + 1
    }});
    
    const category = Category.findOne({
      _id: movie.category_id
    });
    movie.category_id = category;
    return movie;
  }
});


