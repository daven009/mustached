Router.configure({
  layoutTemplate: 'layout'
  // notFoundTemplate: 'notFound',
  // loadingTemplate: 'loading',
});

if (Meteor.isClient) {
  // Show the loading screen on desktop
  Router.onBeforeAction('loading', {except: ['join', 'signin']});
  Router.onBeforeAction('dataNotFound', {except: ['join', 'signin']});
}

Router.map(function() {
  this.route('compose');
  
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

  this.route('nodesList', {
    path:'/:category/:node?',
    controller: 'NodesListController'
  })

  this.route('topic', {
    path: '/topic/:_id',
    controller: 'TopicController'
  });
});
