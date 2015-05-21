Helps=new Mongo.Collection(null);
["帮助","搜索"].forEach(function(e){
  Helps.insert({label:e})
})

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
    //设置当前位置session
    Session.set('chatWithBot', true);
    return {};
  }
});

Template.robot.helpers({
  settings: function() {
    return {
      position: "top",
      limit: 10,
      rules: [
      {
        token: '/',
        collection: Helps,
        field: "label",
        template: Template.helpPill,
        noMatchTemplate: Template.noMatch
      }
      ]
    };
  }
})