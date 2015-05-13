//消息流
Template.messageStream.helpers({
  'isAuthor': function() {
    if (typeof this.topic != 'undefined') {
      return Topics.findOne({_id: this.topic, creator:this.creator});
    }
    return false;
  },
  'getNamecardContent': function() {
    return $('#namecard-'+this.creator).html();
  }
})

Template.messageStream.rendered = function() {
  Tracker.afterFlush(function () {
    //设置已读
    if (typeof this.chatWithId != 'undefined') {
      Meteor.call('readMessage', this.chatWithId);
    }

    if (autoScroll) {
      $('.nano-content').scrollTop('9999');
    }
  })
}