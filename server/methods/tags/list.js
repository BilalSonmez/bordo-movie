import SimpleSchema from 'simpl-schema';

new ValidatedMethod({
  name: 'tags.list',
  validate: new SimpleSchema({}).validator(),
  run: function (data) {
    this.unblock();
    let tagList = [];
    const movies = Movie.find({}).fetch();
    movies.forEach(element => {
      element.tags.forEach(tag => {
        if (!tagList.find(_tag => _tag === tag)){
          tagList.push(tag);
        }
      });
    });
    return tagList;
  }
});
