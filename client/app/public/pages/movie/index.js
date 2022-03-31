import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import Swal from 'sweetalert2';

Template.publicPagesMovie.onCreated(function(){
  this.state = new ReactiveDict(null, {
    movie: {},
    category: {},
    comments: {
      comments: [],
      options: fetchOptionSetup(5)
    }
  });
});

Template.publicPagesMovie.onRendered(function () {
  const self = this;
  const _id = FlowRouter.getParam("_id");
  this.autorun(function() {
    Meteor.call('movie.show', {_id: _id}, function (error, result) {
        if (error) {
            ErrorHandler.show(error)
            return;
        }
        self.state.set('movie', result);
        AppUtil.refreshTokens.set('movie', Random.id());
    });
  });
  this.autorun(function() {
    const comments_data = self.state.get('comments');
    const obj = {
      movie_id: _id,
      options: {
        pagination: {
          currentPage: comments_data.options.pagination.currentPage,
          pageItems: comments_data.options.pagination.pageItems
        },
        filtering: comments_data.options.filtering,
        sorting: comments_data.options.sorting
      }
    };

    Meteor.call('comment.list.movie', obj, function (error, result) {
        if (error) {
            ErrorHandler.show(error)
            return;
        }
        self.state.set('comments', result);
        console.log(result);
        AppUtil.refreshTokens.set('comments', Random.id());
    });
  });
});

Template.publicPagesMovie.events({ 
  'submit #commentForm': function(event, template) { 
    event.preventDefault();
    if (!Meteor.userId()) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please login!',
        footer: '<a href="/auth/signin" target="_blank">Go Sign In?</a>'
      });
      return;
    }
    const message = event.target.commentMessage.value;
    const obj = {
      comment: {
        _user_id: Meteor.userId(),
        _movie_id: FlowRouter.getParam("_id"),
        comment: message
      }
    }
    Meteor.call('comment.create', obj, function (error, result) {

      if (error) {
        console.log(error);
        return;
      }

      event.target.reset();
      Swal.fire({
        icon: 'success',
        title: '',
        text: 'The message will be displayed after confirmation! Thanks for your comment',
      });
    });
  } 
});