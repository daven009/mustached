Meteor.methods({
  addCurrent: function(topicId){
    var user = Meteor.user();
    if(!user){
      throw new Meteor.Error(401, "Not allow");
    }

    var formObj = {
      user: user._id,
      topic: topicId
    };
    var exist = Currents.findOne(formObj);
    if (!exist) {
      Currents.insert(formObj, function(err) {
      });
    }
    else {
      return false;
    }
  }
})