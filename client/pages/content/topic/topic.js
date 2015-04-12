Template.topic.rendered = function() {
  render();
  $(document).ready(function(){
    $(".nano").nanoScroller();
    $('.nano-content').scrollTop('9999');
  })

  delete Session.keys['topicHeader'];
  Session.set('topicHeader',$('#chat-header').outerHeight());

  //点击quote class
  $('body').off('click','.quote').on('click','.quote',function(){
    var originalTitle = $(this).data('originalTitle');
    $('#chat-input-textarea').val($('#chat-input-textarea').val() + originalTitle + ' ');
  })

  //preset compose mode
  composeMode = 'chat';
  //command=91 /=191 ctrl = 17
  var map = {91: false, 191: false, 13: false};
  $('#chat-input-textarea').keydown(function(e) {
    if (e.keyCode in map) {
      map[e.keyCode] = true;
      if (map[91] && map[191]) {
        if (composeMode == 'chat') {
          composeMode = 'compose';
        }
        else {
          composeMode = 'chat';
        }
      }
    }
  }).keyup(function(e) {
    var enterMessage = false;
    map[e.keyCode] = true;
    switch (composeMode) {
      case 'chat':
      if (map[13]) {
        enterMessage = true;
      }
      break;
      case 'compose':
      if (map[13] && map[91]) {
        enterMessage = true;
      }
      break;
    }
    //输入
    if (enterMessage) {
      var content = $(this).val();
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
      $(this).val('');
    }
    if (e.keyCode in map) {
      map[e.keyCode] = false;
    }

  });
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