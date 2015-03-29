Meteor.methods({
  addTopic: function(formObj){
    var user = Meteor.user();
    if(!user){
      throw new Meteor.Error(401, "You need to login to send messages");
    }

    var topicId = Topics.insert(formObj, function(err, res) {
      if(err){
        console.log(err);
        return false;
      }
    });
    return topicId;
  }
})