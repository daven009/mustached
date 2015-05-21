Template.namecard.helpers({
  'current': function() {
    var username = Session.get('currentOnHoverUser');
    var user = Meteor.users.findOne({username:username});
    return user._id;
  }
})