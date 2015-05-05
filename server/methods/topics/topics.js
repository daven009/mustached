Meteor.methods({
  addTopic: function(formObj){
    var user = Meteor.user();
    if(!user){
      throw new Meteor.Error(401, "You need to login to send messages");
    }
    var id = formObj.id;
    var category = formObj.category;
    var node = formObj.node;
    var valid = Nodes.findOne({tag:category,"sub.tag":node});
    if (valid) {
      if (id != null) {
        var exist = Topics.findOne({_id:id,creator:Meteor.userId()});
        if (!exist) {
          return false;
        }
        else {
          Topics.update({_id:id},{$set:formObj}, function(err, res) {
            if(err){
              return false;
            }
          });
          return id;
        }
      }
      else {
        var topicId = Topics.insert(formObj, function(err) {
          if(err){
            return false;
          }
        });
        return topicId;
      }
    }
    else {
      return false;
    }
  }
})