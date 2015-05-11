//global
var autoScroll = true;
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
}


MessageController = RouteController.extend({
  waitOn: function () {
    var str = this.params.name;
    var username = str.substr(1);
    Meteor.subscribe('userByName', username);
    chatWith = Meteor.users.findOne({'username':username});
    if (chatWith) {
      chatWithId = chatWith._id;
      return Meteor.subscribe('messages', Meteor.userId(), chatWithId);
    }
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

      //自动置底
      Tracker.afterFlush(function () {
        if (autoScroll) {
          $('.nano-content').scrollTop('9999');
        }
      });

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
    return {
      position: "top",
      limit: 10,
      rules: [
      {
        token: '@',
        collection: Meteor.users,
        field: "username",
        template: Template.userPill,
        noMatchTemplate: Template.noMatch
      }
      // ,
      // {
      //   token: '!',
      //   collection: Dataset,
      //   field: "_id",
      //   options: '',
      //   matchAll: true,
      //   filter: { type: "autocomplete" },
      //   template: Template.dataPiece
      // }
      ]
    };
  }

})