Meteor.methods({
  addTopic: function(formObj){
    var user = Meteor.user();
    if(!user){
      throw new Meteor.Error(401, "You need to login to send messages");
    }

    var category = formObj.category;
    var node = formObj.node;
    var valid = Nodes.findOne({tag:category,"sub.tag":node});
    if (valid) {
      var topicId = Topics.insert(formObj, function(err) {
        if(err){
          console.log(err);
          return false;
        }
      });
      return topicId;
    }
    else {
      return false;
    }
  }
})