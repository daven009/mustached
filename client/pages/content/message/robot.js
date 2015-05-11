RobotController = RouteController.extend({
  // waitOn: function () {
  //   var str = this.params.name;
  //   var username = str.substr(1);
  //   Meteor.subscribe('userByName', username);
  //   chatWith = Meteor.users.findOne({'username':username});
  //   if (chatWith) {
  //     return Meteor.subscribe('messages', chatWith._id);
  //   }
  // },
  action: function () {
    if (this.ready()){
      this.render();
    }
    else{
      this.render('loading');
    }
  },
  data: function () {
    return {};
  }
});