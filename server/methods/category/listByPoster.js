import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'category.list.poster',
  validate: new SimpleSchema({
    options: { type: QueryOptionsSchema, optional: true }
  }).validator(),
  run: function (data) {
    this.unblock();
    const { options } = data;

    const result = Fetch(Category, {}, options, 'category');
    result.category = result.category.map(_category => {
      let movie = Movie.findOne({category_id: _category._id});
      if (movie) {
        _category.image_url = movie.cover_url;
      } else {
        _category.image_url = "https://via.placeholder.com/446x664.png?text=Category%20Empty";
      }
      return _category;
    });
    return result;
  }
});