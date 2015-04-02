Meteor.publish('userData', function () {
  return Meteor.users.find();
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