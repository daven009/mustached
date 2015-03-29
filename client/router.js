Router.configure({
  // we use the  layout template to define the layout for the entire app
  layoutTemplate: 'layout'

  // the appNotFound template is used for unknown routes and missing lists
  // notFoundTemplate: 'notFound',

  // show the appLoading template whilst the subscriptions below load their data
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
    template: 'content',
    action: function () {
      this.render();
    }
  });

  this.route('topic', {
    path: '/topic/:id',
    controller: 'TopicController'
  });

  // this.route('topic', {
  //   path: '/topic/:_id',
  //   waiton: function () {
  //     return Meteor.subscribe('topics', this.params._id);
  //   },
  //   action: function () {
  //     this.render();
  //   }
  // });
});
