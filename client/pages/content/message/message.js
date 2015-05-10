MessageController = RouteController.extend({
  waitOn: function () {
    return Meteor.subscribe('topic', this.params._id) && Meteor.subscribe('conversations', this.params._id);
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
    params = this.params;
    var topic = Topics.findOne({_id: params._id});
    if(!topic){
      this.render('notFound');
      return;
    }
    //加入常用tab
    Meteor.call('addCurrent', topic._id, function(err){
      if(err){
        return false;
      }
    });
    //设置当前位置session
    Session.set('currentTopicId',topic._id);
    //预设formatted dates
    topic.formattedCreatedAt = moment(topic.createdAt).format('MMMMDD日 YYYY, h:mm:ss A');
    topic.formattedUpdatedAt = moment(topic.updatedAt).format('MMMMDD日 YYYY, h:mm:ss A');

    //default autoscroll
    autoScroll = true;

    return {
      topic: topic
    }
    
  }
});