Meteor.methods({
  sendPrivateMessage: function(formObj){
    var user = Meteor.user();
    if(!user){
      throw new Meteor.Error(401, "You need to login to send messages");
    }

    formObj.creator = Meteor.userId();
    var to = formObj.to;
    var valid = Meteor.users.findOne({_id:to});
    if (valid) {
      Messages.insert(formObj, function(err) {
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