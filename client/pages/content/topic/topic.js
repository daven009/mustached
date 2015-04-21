Template.topic.rendered = function() {
  render();
  $(document).ready(function(){
    $(".nano").nanoScroller();
    $('.content-scrollable').scrollTop('9999');
  })

  delete Session.keys['topicHeader'];
  Session.set('topicHeader',$('#chat-header').outerHeight());

  //点击quote class
  $('body').off('click','.quote').on('click','.quote',function(){
    var originalTitle = $(this).data('originalTitle');
    $('#chat-input-textarea').val($('#chat-input-textarea').val() + originalTitle + ' ').focus();
  })

  //preset compose mode
  composeMode = 'chat';
  Session.set('composeMode',composeMode);
  //command=91 /=191 ctrl = 17
  var map = {91: false, 191: false, 13: false};
  $('#chat-input-textarea').keydown(function(e) {
    if (e.keyCode in map) {
      map[e.keyCode] = true;
      console.log(map);
      if (map[91] && map[191]) {
        if (composeMode == 'chat') {
          composeMode = 'compose';
        }
        else {
          composeMode = 'chat';
        }
        Session.set('composeMode',composeMode);
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
      console.log(map);
    }

  });
}

Template.topic.events({
  'click #showContent':function(e, t){
    $('#contentArea,#showMessage').show();
    $('#messageArea,#inputArea,#showContent').hide();
  },
  'click #showMessage':function(e, t){
    $('#contentArea,#showMessage').hide();
    $('#messageArea,#inputArea,#showContent').show();
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
  },
  'participants': function() {
    var creators = Conversations.find({topic: params._id},{creator:1,_id:0}).fetch();
    var groupedCreators = _.groupBy(_.pluck(creators, 'creator'));

    var arr = [];
    _.each(_.values(groupedCreators), function(creators) {
      arr.push(creators[0]);
    });
    return arr;
  },
  'composeModeIcon': function() {
    var composeMode = Session.get('composeMode');
    if (composeMode == 'chat') {
      return 'fa-pencil-square-o';
    }
    else {
      return 'fa-pencil';
    }
  }
})