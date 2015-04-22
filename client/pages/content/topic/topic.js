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
  //enter=13 /=191 ctrl = 17
  //处理按键切换
  var map = {17: false, 191: false, 13: false};
  $('#chat-input-textarea').keydown(function(e) {
    if (e.keyCode in map) {
      map[e.keyCode] = true;
      console.log(map);
      //ctrl+/
      if (map[17] && map[191]) {
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
    switch (composeMode) {
      case 'chat':
      if (map[13]) {
        enterMessage = true;
      }
      break;
      case 'compose':
      if (map[13] && map[17]) {
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
  //处理点击切换
  $('body').off('click','#composeSwitch').on('click','#composeSwitch',function(){
    if (composeMode == 'chat') {
      composeMode = 'compose';
    }
    else {
      composeMode = 'chat';
    }
    Session.set('composeMode',composeMode);
  })
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
    //加入常用tab
    Meteor.call('addCurrent', topic._id, function(err){
      if(err){
        return false;
      }
    });
    //设置当前位置session
    Session.set('currentTopicId',topic._id);

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
  'composeMode': function() {
    var composeMode = Session.get('composeMode');
    var composeObj = {};
    if (composeMode == 'chat') {
      var composeObj = {
        icon: 'fa-keyboard-o',
        placeholder: '点击此处并输入留言. 支持GitHub flavoured markdown语言. Ctrl+/ 切换输入模式.'
      }
    }
    else {
      var composeObj = {
        icon: 'fa-pencil-square-o',
        placeholder: '点击此处并输入留言. 支持GitHub flavoured markdown语言. Ctrl+/ 切换输入模式, Ctrl+回车发送消息.'
      }
    }

    return composeObj;
  }
})