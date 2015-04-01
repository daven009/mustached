Template.topic.rendered = function() {
  render();
}

Template.topic.events({
  'click #showContent':function(e, t){
    $('#contentArea').fadeIn();
    $('#messageArea').hide();
    $('#inputArea').hide();
    $('#showContent').hide();
    $('#showMessage').show();
  },
  'click #showMessage':function(e, t){
    $('#contentArea').hide();
    $('#messageArea').fadeIn();
    $('#inputArea').fadeIn();
    $('#showContent').show();
    $('#showMessage').hide();
  }
})

TopicController = RouteController.extend({
  waitOn: function () {
    return Meteor.subscribe('topics', this.params._id);
  },
  action: function () {
    if (this.ready()){
      this.render();
    }
    else{
      this.render('loading');
    }
  },
  data: function () {
    var params = this.params;
    var topic = Topics.findOne({_id: params._id});
    if(!topic){
      this.render('notFound');
      return;
    }

    return {
      topic: topic
    }
  }
});