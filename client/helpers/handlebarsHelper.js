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

Handlebars.registerHelper('getCurrentUserAvatar', function(size){
  if (Meteor.user()) {
    var email =  Meteor.user().emails[0].address;
    var url = Gravatar.imageUrl(email, {
      s: size,
      d: 'retro'
    });
    return url;
  }
  else {
    return null;
  }
});

Handlebars.registerHelper('momentDatetime',function(date, format){
  if(date == undefined) return;

  var diff = 86400000; //one day, 24 hrs
  if (moment().diff(moment(date)) >= 86400000) {
    return moment(date).format(format);
  }
  else {
    return moment(date).fromNow();
  }
});