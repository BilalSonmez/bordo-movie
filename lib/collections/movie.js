import SimpleSchema from 'simpl-schema';

Movies = new Mongo.Collection('movies');

MovieSchema = new SimpleSchema({
    title: String,
    category_id: SimpleSchema.RegEx.Id,
    imdb_id: String,
    cover_url: String,
    posters: {
        type: Array
    },
    "posters.$": String,
    tags: {
        type: Array
    },
    "tags.$": String,
});


Movies.attachSchema(MovieSchema);
Movies.softRemovable();
Movies.autoDates();
Movies.lastEditUser();
Movies.createdUser();