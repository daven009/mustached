Meteor.methods({
  insertHelp: function(formObj){
    var topicId = formObj.topic;
    var valid = Topics.findOne({_id:topicId});
    if (valid) {
      Helps.insert(formObj, function(err) {
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