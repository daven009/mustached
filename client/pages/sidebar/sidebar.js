Template.sidebar.events({
  'click #loginBtn': function(e,t){
    $('#signModal').modal('show');
  },
  'click #signout': function(e, t){
    e.preventDefault();
    Meteor.logout();
  }
})