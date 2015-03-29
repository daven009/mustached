Template.topic.rendered = function() {
  render();
}

TopicController = RouteController.extend({
  waitOn: function () {
    return Meteor.subscribe('topics', this.params.id);
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
    var topic = Topics.findOne({_id: params.id});

    if(!topic){
      this.render('notFound');
      return;
    }

    return {
      topic: topic
    }
  }
});