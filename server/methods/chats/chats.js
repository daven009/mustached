Meteor.methods({
  addChat: function(chatWith, push){
    var user = Meteor.user();
    if(!user){
      throw new Meteor.Error(401, "Not allow");
    }

    if (push) {
      var formObj = {
        creator: chatWith,
        chatWith: user._id
      };
    }
    else {
      var formObj = {
        creator: user._id,
        chatWith: chatWith
      };
    }
    var exist = Chats.findOne(formObj);
    if (!exist) {
      Chats.insert(formObj, function(err) {
      });
    }
    else {
      return false;
    }
  },
  removeChat: function(chatWith){
    var user = Meteor.user();
    if(!user){
      throw new Meteor.Error(401, "Not allow");
    }

    Chats.remove({creator:user._id,chatWith:chatWith});
  }
})