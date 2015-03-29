Meteor.publish('userData', function () {
    return Meteor.users.find();
});

//返回单个Topic
Meteor.publish('topics', function(topicId) {
  check(topicId, String);
  return Topics.find({_id: topicId});
});
