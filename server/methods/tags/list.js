import SimpleSchema from 'simpl-schema';

let tagList = [];
const timer = setInterval(() => {
  tagList = [];
}, 1000 * 60 * 24)

new ValidatedMethod({
  name: 'tags.list',
  validate: new SimpleSchema({}).validator(),
  run: function (data) {
    this.unblock();

    if (tagList.length == 0) {
      const movies = Movie.find({}).fetch();

      movies.forEach(movie => {
        movie.tags.forEach(tag => {
          if (!tagList.find(_tag => _tag === tag)) {
            tagList.push(tag);
          }
        });
      });
    }

    return tagList;
  }
});
