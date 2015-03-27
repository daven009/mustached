Handlebars.registerHelper('getUsernameByUserId', function(userId){
  var loggedInUser = Meteor.users.findOne({_id:userId});
  if (typeof loggedInUser != "undefined") {
    if(loggedInUser.username) return loggedInUser.username;
  }
  return 'user';
});

Handlebars.registerHelper('getCurrentUsername', function(){
  return Meteor.user().username;
});