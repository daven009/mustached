//消息流
Template.messageSteam.helpers({
  'isAuthor': function(creator) {
    if (typeof params != 'undefined') {
      return Topics.findOne({_id: params._id, creator:creator});
    }
    return false;
  },
  'getNamecardContent': function(creator) {
    return $('#namecard-'+creator).html();
  }
})

Template.messageSteam.rendered = function() {
  Tracker.afterFlush(function () {
    // if (autoScroll) {
    //   $('.nano-content').scrollTop('9999');
    // }
    console.log(2);
  });
  console.log(1);
}