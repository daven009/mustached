MessageController = RouteController.extend({
  waitOn: function () {
    var str = this.params.name;
    var username = str.substr(1);
    console.log(username);
    return Meteor.subscribe('messages', this.params.name);
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
    return {};
  }
});