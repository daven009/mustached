Template.sidebar.rendered = function(){
  $('body').off('click','.crossBtnTopic').on('click','.crossBtnTopic',function(){
    var topicId = $(this).data('referId');
    Meteor.call('removeCurrent',topicId);
  })
  $('body').off('click','.crossBtnChat').on('click','.crossBtnChat',function(){
    var chatWithId = $(this).data('referId');
    console.log(chatWithId);
    Meteor.call('removeChat',chatWithId);
  })
}

Template.sidebar.events({
  'click .loginBtn': function(e,t){
    $('#signModal').modal('show');
  },
  'click #signout': function(e, t){
    e.preventDefault();
    Meteor.logout();
  }
})

Template.sidebar.helpers({
  'currents': function(){
    Meteor.subscribe("currents",Meteor.userId());
    return Currents.find({}).fetch();
  },
  'currentUserId': function() {
    return Meteor.userId();
  },
  'chats': function(){
    Meteor.subscribe("chats",Meteor.userId());
    return Chats.find({}).fetch();
  },
  'getTopicNameById': function(topicId) {
    Meteor.subscribe('topic', topicId);
    var topic = Topics.findOne({_id:topicId});
    if (topic) {
      return topic.title;
    }
    return false;
  },
  'newChatMessages':function(chatWithId){
    Meteor.subscribe('messages', Meteor.userId(), chatWithId);
    var newMessages = Messages.find({to:Meteor.userId(),creator:chatWithId,isRead:false}).count();
    if (newMessages > 100) {
      return "99+";
    }
    else if (newMessages > 0) {
      return newMessages;  
    }
    else {
      return null;
    }    
  },
  'isTopicActive': function(topicId) {
    var currentTopicId = Session.get('currentTopicId');
    if (currentTopicId == topicId) {
      return 'active white';
    }
    else {
      return null;
    }
  },
  'isChatActive': function(chatWith) {
    var currentChatWith = Session.get('currentChatWith');
    if (currentChatWith == chatWith) {
      return 'active white';
    }
    else {
      return null;
    }
  },
  'isBotActive': function() {
    var chatWithBot = Session.get('chatWithBot');
    if (chatWithBot) {
      return 'active white';
    }
    else {
      return null;
    }
  }
})