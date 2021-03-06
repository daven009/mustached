//global
autoScroll = true;
Template.message.rendered = function() {
  render();
  $(document).ready(function(){
    $(".nano").nanoScroller();
    $('.nano-content').scroll(function(e){
      var elem = $(e.currentTarget);
      if (elem[0].scrollHeight - elem[0].scrollTop - elem[0].clientHeight <= 5)
      {
        autoScroll = true;
      }
      else {
        autoScroll = false;
      }
    })
  })

  //preset compose mode
  composeMode = 'chat';
  Session.set('composeMode',composeMode);
  //enter=13 /=191 ctrl=17 command=91
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
      //发送消息
      autoScroll = true;
      CommonHelper.sendPrivateMessage(chatWithId, content);
      //让对方收到私聊窗口
      Meteor.call('addChat', chatWithId, true, function(err){
        if(err){
          return false;
        }
      });
      $(this).val('');
    }
    if (e.keyCode in map) {
      map[e.keyCode] = false;
    }
  });
}


MessageController = RouteController.extend({
  // a place to put your subscriptions
  subscriptions: function() {
    var str = this.params.name;
    username = str.substr(1);
    this.subscribe('userByName', username).wait();
  },
  waitOn: function () {
    var str = this.params.name;
    username = str.substr(1);
    chatWith = Meteor.users.findOne({'username':username});
    if (chatWith) {
      chatWithId = chatWith._id;
      this.subscribe('messages', Meteor.userId(), chatWithId).wait();
    }
  },
  action: function () {
    if (typeof chatWith == 'undefined') {
      Router.go('home');
    }
    if (this.ready()){
      this.render();
    }
    else{
      this.render('loading');
    }
  },
  data: function () {
    if (typeof chatWithId != 'undefined') {
      //加入私聊tab
      Meteor.call('addChat', chatWithId, false, function(err){
        if(err){
          return false;
        }
      });
      //设置当前位置session
      Session.set('currentChatWith', chatWithId);
      Meteor.call('readMessage', chatWithId);
    }
    return {
      chatWith: chatWith
    };
  }
});

Template.message.helpers({
  'conversations': function() {
    if (typeof chatWithId != 'undefined') {
      var conversations = Messages.find({$or:[{creator:Meteor.userId(), to:chatWithId},{creator:chatWithId, to:Meteor.userId()}]}).fetch();
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
      return groupedConversations;
    }
    else {
      return {};  
    }
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
  },
  settings: function() {
    Meteor.subscribe("currents",Meteor.userId());
    var CurrentTopics = new Mongo.Collection(null);
    Currents.find({}).fetch().forEach(function(e){
      Meteor.subscribe('topic', e.topic);
      var topic = Topics.findOne({_id:e.topic});
      if (topic) {
        CurrentTopics.insert({label:topic.title+'#'});
      }
    })
    
    return {
      position: "top",
      limit: 10,
      rules: [
      {
        token: '#',
        collection: CurrentTopics,
        field: "label",
        template: Template.topicPill,
        noMatchTemplate: Template.noMatch
      }
      ]
    };
  }
})