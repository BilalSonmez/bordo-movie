import SimpleSchema from 'simpl-schema';

Movie = new Mongo.Collection('movies');

MovieSchema = new SimpleSchema({
    title: String,
    category_id: SimpleSchema.RegEx.Id,
    imdb_id: String,
    description: String,
    cover_url: String,
    views: Number,
    posters: {
        type: Array
    },
    "posters.$": String,
    tags: {
        type: Array
    },
    "tags.$": String,
});


Movie.attachSchema(MovieSchema);
Movie.softRemovable();
Movie.autoDates();
Movie.lastEditUser();
Movie.createdUser();