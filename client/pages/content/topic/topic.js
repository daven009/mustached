Template.topic.rendered = function() {
  render();
  $(document).ready(function(){
    $(".nano").nanoScroller();
  })

  //点击quote class
  $('body').off('click','.quote').on('click','.quote',function(){
    var originalTitle = $(this).data('originalTitle');
    $('#chat-input-textarea').val($('#chat-input-textarea').val() + originalTitle + ' ').focus();
  })

  //preset compose mode
  composeMode = 'chat';
  Session.set('composeMode',composeMode);
  //enter=13 /=191 ctrl=17 command=91
  //处理按键切换
  var map = {17: false, 191: false, 13: false};
  $('body').off('keydown','#chat-input-textarea').off('keyup','#chat-input-textarea')
  .on('keydown','#chat-input-textarea', function(e) {
    if (e.keyCode in map) {
      map[e.keyCode] = true;
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
  }).on('keyup','#chat-input-textarea', function(e) {
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
      CommonHelper.sendMessage(params._id,content);
      $(this).val('');
    }
    if (e.keyCode in map) {
      map[e.keyCode] = false;
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

  //点击切换内容
  $('body').off('click','#showContentBtn').on('click','#showContentBtn',function(){
    $(this).toggleClass('onActive');
    $('#topicContent').toggle('hidden');
  })
}

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
  'conversations': function() {
    var conversations = Conversations.find({topic:params._id}).fetch();
    if (conversations) {
      _.each(conversations, function(conversation, key) {
        conversations[key].prettyDate = CommonHelper.prettyDateTime(conversation.createdAt);
      })
      var groupedConversations = _.groupBy(conversations, 'prettyDate');

      _.each(groupedConversations, function(conversations, key) {
        var prev = '';
        _.each(conversations, function(conversation, k) {
          if (conversation.creator != prev) {
            prev = conversation.creator;
          }
          else {
            groupedConversations[key][k].hasParent = true;
          }
        });  
      })
    }
    //自动置低
    Tracker.afterFlush(function () {
      $('.nano-content').scrollTop('9999');
    });
    return groupedConversations;
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

//消息流
Template.messageSteam.helpers({
  'isAuthor': function(creator) {
    return Topics.findOne({_id: params._id, creator:creator});
  }
})