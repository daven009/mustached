Template.sidebar.rendered = function(){
  $('body').off('click','.crossBtn').on('click','.crossBtn',function(){
    var topicId = $(this).data('referId');
    Meteor.call('removeCurrent',topicId);
  })
}

Template.sidebar.events({
  'click #loginBtn': function(e,t){
    $('#signModal').modal('show');
  },
  'click #signout': function(e, t){
    e.preventDefault();
    Meteor.logout();
  }
})

Template.sidebar.helpers({
  'currents': function(){
    Meteor.subscribe("currents",Meteor.userId());
    return Currents.find({}).fetch();
  },
  'getTopicNameById': function(topicId) {
    Meteor.subscribe('topic', topicId);
    var topic = Topics.findOne({_id:topicId});
    if (topic) {
      return topic.title;
    }
    return false;
  },
  'isActive': function(topicId) {
    var currentTopicId = Session.get('currentTopicId');
    if (currentTopicId == topicId) {
      return 'active white';
    }
    else {
      return null;
    }
  }
})