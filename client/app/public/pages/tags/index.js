import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.publicPagesTag.onCreated(function(){
  this.state = new ReactiveDict(null, {
    tag: FlowRouter.getParam("_tag"),
  });
});
