Template.topic.rendered = function() {
  render();
  delete Session.keys['topicHeader'];
  Session.set('topicHeader',$('#chat-header').outerHeight());
}

Template.topic.events({
  'click #showContent':function(e, t){
    $('#contentArea').fadeIn();
    $('#messageArea,#inputArea,#showContent').hide();
    $('#showMessage').show();
  },
  'click #showMessage':function(e, t){
    $('#contentArea,#showMessage').hide();
    $('#messageArea,#inputArea').fadeIn();
    $('#showContent').show();
  },
  'keypress #chat-input-textarea': function(e, t) {
    console.log(e);
  }
})

TopicController = RouteController.extend({
  waitOn: function () {
    return Meteor.subscribe('topic', this.params._id);
  },
  action: function () {
    if (this.ready()){
      this.render();
    }
    else{
      this.render('loading');
    }
  },
  data: function () {
    var params = this.params;
    var topic = Topics.findOne({_id: params._id});
    if(!topic){
      this.render('notFound');
      return;
    }

    return {
      topic: topic
    }
  }
});

Template.topic.helpers({
  'paddingTop': function(){
    return Session.get('topicHeader');
  }

})