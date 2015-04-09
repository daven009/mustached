Meteor.methods({
  sendMessage: function(formObj){
    var user = Meteor.user();
    if(!user){
      throw new Meteor.Error(401, "You need to login to send messages");
    }

    var topicId = formObj.topic;
    var valid = Topics.findOne({_id:topicId});
    if (valid) {
      Conversations.insert(formObj, function(err) {
        if(err){
          console.log(err);
          return false;
        }
        else {
          return true;
        }
      });
    }
    else {
      return false;
    }
  }
})