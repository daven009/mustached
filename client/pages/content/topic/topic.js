Template.topic.rendered = function() {
  render();
  delete Session.keys['topicHeader'];
  Session.set('topicHeader',$('#chat-header').outerHeight());
  //点击quote class
  $('body').off('click','.quote').on('click','.quote',function(){
    var originalTitle = $(this).data('originalTitle');
    $('#chat-input-textarea').val($('#chat-input-textarea').val() + originalTitle + ' ');
  })
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
  'keyup #chat-input-textarea': function(e, t) {
    if (e.which == 13) {
      var content = $('#chat-input-textarea').val();
      if (CommonHelper.isNotEmpty(content)) {
        var formObj = {
          creator: Meteor.userId(),
          topic: params._id,
          content: content
        };
        Meteor.call('sendMessage', formObj, function(err, res){
          if (err) {
            console.log(err);
          }
        })
      }
      $('#chat-input-textarea').val('');
    }
  }
})

TopicController = RouteController.extend({
  waitOn: function () {
    return Meteor.subscribe('topic', this.params._id) && Meteor.subscribe('conversations', this.params._id);
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
    params = this.params;
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
  },
  'conversations': function() {
    var conversations = Conversations.find({topic:params._id}).fetch();
    if (conversations) {
      var prev = '';
      _.each(conversations, function(conversation, key){
        if (conversation.creator != prev) {
          prev = conversation.creator;
        }
        else {
          conversations[key].hasParent = true;
        }
      });
    }
    return conversations;
  },
  'isAuthor': function(creator) {
    return Topics.findOne({_id: params._id, creator:creator});
  }
})