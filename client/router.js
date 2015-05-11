Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  waitOn: function() {
    return [
      Meteor.subscribe('nodes')
    ];
  }
});

if (Meteor.isClient) {
  Iron.Router.hooks.delCurrentTopic = function () {
    delete Session.keys['currentTopicId'];
    this.next();
  };
  Iron.Router.hooks.isLoggedIn = function () {
    if (!(Meteor.user() || Meteor.loggingIn())) {
      //, {category:Nodes.findOne().tag}
      // Router.go('home');
      console.log(1);
      window.location = '/'+ Nodes.findOne().tag;
    }
    else {
      this.next();
    }
  };

  // Show the loading screen on desktop
  Router.onBeforeAction('delCurrentTopic');
  Router.onBeforeAction('isLoggedIn', {only: ['compose']});
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.map(function() {
  this.route('compose', {
    path: '/compose/:_id?',
    controller: 'ComposeController'
  });
  
  this.route('home', {
    path: '/',
    action: function() {
      //取出nodes集合
      var nodes = Nodes.find({}).fetch();
      if (nodes) {
        _.each(nodes, function(node) {
          if (node.peak) {
            Router.go('nodesList', {category:node.tag});
          }
        })
      }
    }
  });

  this.route('robot', {
    path: '/message/@mustachedbot/',
    controller: 'RobotController'
  })

  this.route('message', {
    path: '/message/:name/',
    controller: 'MessageController'
  })

  this.route('topic', {
    path: '/topic/:_id/',
    controller: 'TopicController'
  });
  
  this.route('nodesList', {
    path:'/:category/:node?',
    onBeforeAction: function(){
      var conditions = {"tag":this.params.category};
      if (typeof this.params.node != "undefined") {
        conditions = {"tag":this.params.category,"sub.tag":this.params.node};
      }
      var node = Nodes.findOne(conditions);
      if (node) {
        this.next();
      }
      else {
        Router.go('home');
      }
    },
    controller: 'NodesListController'
  })
});
