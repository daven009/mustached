Template.namecard.helpers({
  'current': function() {
    var username = Session.get('currentOnHoverUser');
    var user = Meteor.users.findOne({username:username});
    if (user) {
        return user._id;   
    }
  }
})