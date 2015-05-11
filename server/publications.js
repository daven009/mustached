Meteor.publish('userData', function (userId) {
  return Meteor.users.find({_id:userId});
});

Meteor.publish('userByName', function (username) {
  return Meteor.users.find({username:username});
});

Meteor.publish('onlineUsers', function () {
  return Meteor.users.find({"status.online": true });
});

Meteor.publish('nodes', function () {
  return Nodes.find();
});

//返回单个Topic
Meteor.publish('topic', function(topicId) {
  check(topicId, String);
  return Topics.find({_id: topicId});
});

//返回多个Topic
Meteor.publish('topicsByNodes', function(category,node) {
  if (typeof node != 'undefined') {
    return Topics.find({category: category, node:node});
  }
  else {
    return Topics.find({category: category});
  }
});

//返回关于topic的所有conversation
Meteor.publish('conversations', function(topicId) {
  check(topicId, String);
  return Conversations.find({topic: topicId});
});

//返回关于用户的所有当前参与话题
Meteor.publish('currents', function(userId) {
  check(userId, String);
  return Currents.find({user: userId});
});

//计算用户数量
Meteor.publish('totalUsers', function() {
  return Meteor.users.find({});
});

//计算主题数量
Meteor.publish('totalTopics', function() {
  return Topics.find({});
});

//计算回复数量
Meteor.publish('totalConversations', function() {
  return Conversations.find({});
});

//抓取收到的信息
Meteor.publish('messages', function(a, b) {
  return Messages.find({$or:[{creator:a,to:b},{creator:b,to:a}]});
});